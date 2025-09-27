import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { html, css, references, playground } from "../assets/assets";
import Card from "../components/Card";
import Hero from "../components/Hero";
import Modal from "../components/Modal";

function Home() {
  const [completed, setCompleted] = useState(
    localStorage.getItem("maclearn-completed") ? JSON.parse(localStorage.getItem("maclearn-completed")) : []
  );
  const [progress, setProgress] = useState({});
  const [modal, setModal] = useState(localStorage.getItem("modal") ? JSON.parse(localStorage.getItem("modal")) : true);

  useEffect(() => {
    let progressObj = [...completed].reduce((acc, quiz) => {
      let course = quiz.split(",")[0];
      if (!acc[course]) {
        acc[course] = [];
      }
      acc[course]?.push(quiz);
      return acc;
    }, {});

    setProgress(progressObj);
  }, [completed]);

  useEffect(() => {
    localStorage.setItem("modal", modal);
  }, [modal]);

  return (
    <>
      {modal && (
        <Modal
          img="/media/img.jpg"
          name="Introducing: MacLearn 2.0!"
          description="Upgraded features, complete redesign, interactivity reimagined, all built with a brand new technology."
          link="https://mac-web.github.io/macblog/#/post/"
          setModal={setModal}
          //TODO: update modal release notes link
        />
      )}
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="wrap"
      >
        <Hero title="Welcome to MacLearn!" description="Learn and master web development for free." />
        <div className="cards">
          <Card
            link="/html"
            name="HTML"
            img={html}
            description="Learn HTML to add content to your webpage."
            progress={Math.round((progress.html ? progress.html.length / 6 : 0) * 100)}
          />
          <Card
            link="/css"
            name="CSS"
            img={css}
            description="Master CSS to design and style your webpage."
            progress={Math.round((progress.css ? progress.css.length / 8 : 0) * 100)}
          />
          <Card
            link="/references"
            name="References"
            img={references}
            description="Browse our detailed references to learn more."
          />
          <Card
            link="/playground"
            name="Playground"
            img={playground}
            description="Experiment and apply your skills in playground."
          />
        </div>
      </motion.div>
    </>
  );
}

export default Home;
