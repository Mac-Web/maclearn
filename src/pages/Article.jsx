import { motion, AnimatePresence } from "framer-motion";
import { articles, share, report, star, starred, quizzes } from "../assets/assets";
import { useNavigate, useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Btn from "../components/Btn";
import Lab from "../components/Lab";
import Notification from "../components/Notification";
import "./Article.css";

function Article({ course }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState("");
  const [matchingArticles, setMatchingArticles] = useState({});
  const [favorites, setFavorites] = useState(
    localStorage.getItem("maclearn-favorites") ? JSON.parse(localStorage.getItem("maclearn-favorites")) : []
  );
  const [notified, setNotified] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [recents, setRecents] = useState(
    localStorage.getItem("maclearn-recents") ? JSON.parse(localStorage.getItem("maclearn-recents")) : []
  );
  const [achievements, setAchievements] = useState(
    localStorage.getItem("maclearn-achievements") ? JSON.parse(localStorage.getItem("maclearn-achievements")) : []
  );
  const [quizBtn, setQuizBtn] = useState();
  const parts = article.paragraph?.split("[LAB]");

  useEffect(() => {
    articles[course].find((article) => article.id == id)
      ? setArticle(articles[course].find((article) => article.id == id))
      : navigate("/");
    setNotified(false);
    if (!recents.includes(course + "," + id)) {
      if (recents.length == 5) {
        if (!achievements.includes("Dedicated Learner: Read 6 articles from any course")) {
          createNotification("Achievement earned: Dedicated Learner! Go to your learner profile on the top right to learn more.");
          setAchievements([...achievements, "Dedicated Learner: Read 6 articles from any course"]);
        }
        let oldRecents = [...recents];
        setRecents([...oldRecents.slice(1, 5), course + "," + id]);
      } else {
        setRecents([...recents, course + "," + id]);
      }
    }
    quizzes[course]?.forEach((quiz) => {
      if (quiz.prev == id) setQuizBtn("next," + quiz.id);
      if (quiz.prev == id - 1) setQuizBtn("back," + quiz.id);
    });
  }, [id]);

  useEffect(() => {
    let allArticles = course === "references" ? [...articles[course]] : [...articles[course], ...quizzes[course]];
    const groupedArticles = allArticles.reduce((acc, article) => {
      const unit = article.unit;
      if (!acc[unit]) {
        acc[unit] = [];
      }
      acc[unit].push(article);
      return acc;
    }, {});
    setMatchingArticles(groupedArticles);
  }, [article]);

  useEffect(() => {
    localStorage.setItem("maclearn-recents", JSON.stringify(recents));
    console.log(recents);
  }, [recents]);

  useEffect(() => {
    localStorage.setItem("maclearn-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("maclearn-achievements", JSON.stringify(achievements));
  }, [achievements]);

  function createNotification(text) {
    setNotified(true);
    setNotificationText(text);
    setTimeout(() => {
      setNotified(false);
    }, 3000);
  }

  return (
    <div className="article-wrap">
      <AnimatePresence>{notified && <Notification text={notificationText} />}</AnimatePresence>
      <ul className="sidebar">
        {Object.entries(matchingArticles).map(([unit, articles]) => {
          return (
            <>
              <h3 className="unit">{unit}</h3>
              <div className="sidelinks">
                {articles.map((article) => {
                  return (
                    <Link
                      style={{ color: article.id == id && article.articleName ? "var(--primary-color)" : "" }}
                      to={`/${course}/${article.articleName ? article.id : "q/" + article.id}`}
                    >
                      {article.sidebarText
                        ? article.sidebarText
                        : article.articleName
                        ? article.articleName
                        : article.name + " Quiz"}
                    </Link>
                  );
                })}
              </div>
            </>
          );
        })}
      </ul>
      <div className="content">
        <title>{`${article.articleName} | MacLearn`}</title>
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="wrap"
        >
          <Hero title={article.articleName} />
          <div className="article-info">
            <h3 className="author">
              <span className="date">{article.articleDate}</span>
              <span>By {article.author}</span>
            </h3>
            <div className="article-btns">
              <img
                src={favorites.includes(course + id) ? starred : star}
                className="article-btn"
                title="Favorite article"
                onClick={() => {
                  if (favorites.includes(course + id)) {
                    setFavorites(favorites.filter((favorite) => favorite !== course + id));
                    createNotification("Article removed from Favorites!");
                  } else {
                    setFavorites([...favorites, course + id]);
                    createNotification("Article added to Favorites!");
                  }
                }}
              />
              <img
                src={share}
                className="article-btn"
                title="Share article"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  createNotification("Article link copied to clipboard!");
                }}
              />
              <img
                src={report}
                className="article-btn"
                title="Report article"
                onClick={() => {
                  window.open("https://forms.gle/GrNw79oqWgr2u9aLA", "_blank");
                }}
              />
            </div>
          </div>
          <hr className="article-hr" />
          {parts?.map((part, i) => {
            return (
              <div key={i}>
                <div className="paragraph-content" dangerouslySetInnerHTML={{ __html: part }} />
                {i < parts.length - 1 && (
                  <Lab
                    html={article.interactives ? article.interactives[i] : article.interactiveHTML}
                    css={article.interactiveCSS ? article.interactiveCSS : ""}
                  />
                )}
              </div>
            );
          })}
          {course == "references" ? (
            <div className="action-btns">
              <Btn link={`/${course}/${id == 0 ? "" : parseInt(id) - 1}`} content="Back" />
              <Btn link={`/${course}/${id == articles[course].length - 1 ? "" : parseInt(id) + 1}`} content="Next" />
            </div>
          ) : (
            <div className="action-btns">
              <Btn
                link={`/${course}/${
                  quizBtn?.split(",")[0] == "back" ? "q/" + quizBtn.split(",")[1] : id == 0 ? "" : parseInt(id) - 1
                }`}
                content="Back"
              />
              <Btn
                link={`/${course}/${
                  quizBtn?.split(",")[0] == "next"
                    ? "q/" + quizBtn.split(",")[1]
                    : id == articles[course].length - 1
                    ? ""
                    : parseInt(id) + 1
                }`}
                content="Next"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Article;
