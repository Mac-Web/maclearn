import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import { articles, quizzes } from "../assets/assets";
import Hero from "../components/Hero";
import Accordion from "../components/Accordion";
import Notification from "../components/Notification";
import "./Me.css";

function Me() {
  const [notified, setNotified] = useState(false);
  const [otherOpen, setOtherOpen] = useState(0);
  const [favorites, setFavorites] = useState(
    localStorage.getItem("maclearn-favorites") ? JSON.parse(localStorage.getItem("maclearn-favorites")) : []
  );
  const [recents, setRecents] = useState(
    localStorage.getItem("maclearn-recents") ? JSON.parse(localStorage.getItem("maclearn-recents")) : []
  );
  const [achievements, setAchievements] = useState(
    localStorage.getItem("maclearn-achievements") ? JSON.parse(localStorage.getItem("maclearn-achievements")) : []
  );
  let groupedFavorites;
  if (favorites) {
    groupedFavorites = favorites.reduce((acc, article) => {
      let course;
      if (article.includes("html")) course = "html";
      if (article.includes("css")) course = "css";
      if (article.includes("references")) course = "references";
      if (!acc[course]) {
        acc[course] = [];
      }
      acc[course].push(article);
      return acc;
    }, {});
  }

  function clearData() {
    if (confirm("Are you sure you want to clear all your saved articles and data on MacLearn? This action can not be undone.")) {
      localStorage.clear();
      setFavorites([]);
      setRecents([]);
      setAchievements([]);
      setNotified(true);
      setTimeout(() => {
        setNotified(false);
      }, 3000);
    }
  }

  return (
    <>
      <title>Me | MacLearn</title>
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="wrap"
      >
        <AnimatePresence>{notified && <Notification text="Data successfully cleared" />}</AnimatePresence>
        <Hero
          title="My Learner Profile"
          description="You can check out all your favorite articles, achievements, and recent activities here!"
          link="Clear user data"
          linkFunction={clearData}
        />
        <div className="section">
          <h2 className="section-title">Favorited Articles</h2>
          {favorites?.length > 0 ? (
            <div className="accordions">
              {Object.entries(groupedFavorites).map(([course, favorites], index) => {
                let favoritedArticles = favorites.map((favorite) => {
                  return articles[course].find((article) => course + article.id == favorite);
                });
                return (
                  <Accordion
                    name={course == "references" ? "References" : course.toUpperCase()}
                    articles={favoritedArticles}
                    otherOpen={otherOpen}
                    openDefault={index == 0}
                    setOtherOpen={setOtherOpen}
                    index={index}
                    course={course}
                  />
                );
              })}
            </div>
          ) : (
            <p className="description">You haven't favorited any articles. Click on the tabs above to explore them!</p>
          )}
        </div>
        <div className="section">
          <h2 className="section-title">Achievements ({achievements.length}/2)</h2>
          {achievements.length > 0 ? (
            <div className="me-activities">
              {[...achievements].map((achievement) => (
                <div className="me-activity">{achievement}</div>
              ))}
            </div>
          ) : (
            <p className="description">You haven't collected any achievements. Read some articles to get started!</p>
          )}
        </div>
        <div className="section">
          <h2 className="section-title">Recent Activities</h2>
          {recents.length > 0 ? (
            <div className="me-activities">
              {[...recents].reverse().map((recent) => {
                let content;
                if (recent.split(",")[1] == "q") {
                  content = quizzes[recent.split(",")[0]].find((quiz) => quiz.id == recent.split(",")[2]).name + " Quiz";
                } else {
                  content = articles[recent.split(",")[0]].find((article) => article.id == recent.split(",")[1])?.articleName;
                }
                return (
                  <Link
                    to={`/${recent.split(",")[0]}/${recent.split(",")[1] == "q" ? recent.split(",")[1] + "/" : ""}${
                      recent.split(",")[recent.split(",").length - 1]
                    }`}
                    className="me-activity"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="description">Articles you've read and quizzes you've done recently will appear here.</p>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Me;
