import { motion, AnimatePresence } from "framer-motion";
import { articles, quizzes, warning } from "../assets/assets";
import { useNavigate, useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import Notification from "../components/Notification";
import Btn from "../components/Btn";
import "./Quiz.css";

function Quiz({ course }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quiz, setQuiz] = useState("");
  const [matchingArticles, setMatchingArticles] = useState({});
  const [notified, setNotified] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [failed, setFailed] = useState(true);
  const [recents, setRecents] = useState(
    localStorage.getItem("maclearn-recents") ? JSON.parse(localStorage.getItem("maclearn-recents")) : []
  );
  const [completed, setCompleted] = useState(
    localStorage.getItem("maclearn-completed") ? JSON.parse(localStorage.getItem("maclearn-completed")) : []
  );
  const [achievements, setAchievements] = useState(
    localStorage.getItem("maclearn-achievements") ? JSON.parse(localStorage.getItem("maclearn-achievements")) : []
  );

  useEffect(() => {
    quizzes[course].find((quiz) => quiz.id == id) ? setQuiz(quizzes[course].find((quiz) => quiz.id == id)) : navigate("/");
    setNotified(false);
    setStarted(false);
    setEnded(false);
    setSelectedOptions([]);
    setIndex(0);
    if (!recents.includes(course + ",q," + id)) {
      if (recents.length == 5) {
        let oldRecents = [...recents];
        setRecents([...oldRecents.slice(1, 5), course + ",q," + id]);
      } else {
        setRecents([...recents, course + ",q," + id]);
      }
    }
  }, [id]);

  useEffect(() => {
    const groupedArticles = [...articles[course], ...quizzes[course]].reduce((acc, article) => {
      const unit = article.unit;
      if (!acc[unit]) {
        acc[unit] = [];
      }
      acc[unit].push(article);
      return acc;
    }, {});
    setMatchingArticles(groupedArticles);
  }, [quiz]);

  useEffect(() => {
    localStorage.setItem("maclearn-recents", JSON.stringify(recents));
  }, [recents]);

  useEffect(() => {
    localStorage.setItem("maclearn-completed", JSON.stringify(completed));
  }, [completed]);

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

  function handleFinishQuiz() {
    setEnded(true);
    let countScore = 0;
    selectedOptions.forEach((answer, index) => {
      if (answer === quiz.questions[index].correct) countScore++;
    });
    if (countScore === quiz.questions.length) {
      setFailed(false);
      let qId = course + "," + id;
      if (!completed.includes(qId)) {
        let newCompleted = [...completed, qId];
        setCompleted(newCompleted);
        if (newCompleted.length == 14) {
          createNotification(
            "Quiz completed, Achievement earned: Web Development Master! Go to your learner profile to learn more."
          );
          setAchievements([...achievements, "Web Development Master: Finish both HTML and CSS courses"]);
        } else {
          createNotification("Quiz completed! +100XP");
        }
      } else {
        createNotification("Quiz completed before, no XP earned.");
      }
    }
    setScore(countScore);
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
                      style={{ color: article.id == id && article.name ? "var(--primary-color)" : "" }}
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
        <title>{`${quiz.name} Quiz | MacLearn`}</title>
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="wrap"
        >
          {!started && (
            <div className="quiz-hero">
              <h1 className="quiz-name">{quiz.name + " Quiz"}</h1>
              <p className="quiz-description">{quiz.description}</p>
              <button className="action-btn" onClick={() => setStarted(true)}>
                Start
              </button>
              {completed.includes(course + "," + id) && (
                <div className="quiz-warning">
                  <img src={warning} />
                  You've already gotten 100% on this quiz before, so no additional XP will be gained from completing the quiz
                  again.
                </div>
              )}
            </div>
          )}
          {started && !ended && (
            <div className="question">
              <h2 className="question-name">{quiz.questions[index].question}</h2>
              <form className="question-options">
                {quiz.questions[index].options.map((option, i) => (
                  <label className="question-option" key={i}>
                    <input
                      type="radio"
                      checked={selectedOptions[index] === i}
                      onChange={() => {
                        const newSelectedOptions = [...selectedOptions];
                        newSelectedOptions[index] = i;
                        setSelectedOptions(newSelectedOptions);
                      }}
                    />{" "}
                    {option}
                  </label>
                ))}
              </form>
              <div className="question-btns">
                {index !== 0 && (
                  <button className="action-btn" onClick={() => setIndex(index - 1)}>
                    Back
                  </button>
                )}
                {index !== quiz.questions.length - 1 && (
                  <button className="action-btn" onClick={() => setIndex(index + 1)}>
                    Next
                  </button>
                )}
                {index === quiz.questions.length - 1 && (
                  <button className="action-btn" onClick={handleFinishQuiz}>
                    Finish
                  </button>
                )}
              </div>
            </div>
          )}
          {ended && (
            <div className="quiz-hero">
              <p className="quiz-description">
                You scored {score}/{quiz.questions.length} with {Math.floor((score / quiz.questions.length) * 100)}% accuracy on
                the quiz.
                <br />
                {failed ? "Go back, review, and try again to improve your score!" : quiz.end}
              </p>
              <div className="quiz-results">
                {quiz.questions.map((question, i) => {
                  return (
                    <div className="result-question">
                      <h2>{question.question}</h2>
                      <div className="result-options">
                        {question.options.map((option, j) => {
                          return (
                            <div
                              className="result-option"
                              style={{
                                backgroundColor:
                                  question.correct == j && question.correct == selectedOptions[i]
                                    ? "var(--green)"
                                    : selectedOptions[i] == j
                                    ? "var(--red)"
                                    : selectedOptions[i]
                                    ? "transparent"
                                    : "var(--red)",
                              }}
                            >
                              {option}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Btn link={`/${course}/${failed ? quiz.prev : quiz.prev + 1}`} content={failed ? "Review" : "Go"} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Quiz;
