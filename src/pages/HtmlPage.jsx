import { motion } from "framer-motion";
import { useState } from "react";
import { articles, quizzes } from "../assets/assets";
import Hero from "../components/Hero";
import Accordion from "../components/Accordion";

function HtmlPage() {
  const [otherOpen, setOtherOpen] = useState(0);
  const groupedArticles = [...articles.html, ...quizzes.html].reduce((acc, article) => {
    const unit = article.unit;
    if (!acc[unit]) {
      acc[unit] = [];
    }
    acc[unit].push(article);
    return acc;
  }, {});

  return (
    <>
      <title>HTML | MacLearn</title>
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="wrap"
      >
        <Hero
          title="Learn HTML"
          description="HTML is a very powerful markup language that adds content and structure to your page."
        />
        <div className="accordions">
          {Object.entries(groupedArticles).map(([unit, articles], index) => {
            return (
              <Accordion
                name={unit}
                articles={articles}
                otherOpen={otherOpen}
                openDefault={index == 0}
                setOtherOpen={setOtherOpen}
                index={index}
              />
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

export default HtmlPage;
