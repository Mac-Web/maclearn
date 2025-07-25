import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

function Accordion({ name, articles, openDefault = false, otherOpen, setOtherOpen, index, course = null }) {
  const [open, setOpen] = useState(openDefault);
  const [height, setHeight] = useState("0px");
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (otherOpen !== index) setOpen(false);
  }, [otherOpen]);

  useEffect(() => {
    setShouldAnimate(true);
    if (open && contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(scrollHeight + "px");
    } else {
      setHeight("0px");
    }
  }, [open]);

  function handleToggle() {
    setOpen(!open);
    setOtherOpen(index);
  }

  return (
    <div className="accordion">
      <h2 className="accordion-title" onClick={handleToggle}>
        {name}
      </h2>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={contentRef}
            initial={{ height: "0px" }}
            animate={{ height: shouldAnimate ? height : "auto" }}
            exit={{ height: "0px" }}
            className="accordion-content"
          >
            {articles.map((article) => {
              return (
                <Link
                  to={course ? `/${course}/${article.id}` : `${article.articleName ? article.id : "q/" + article.id}`}
                  className="accordion-item"
                >
                  {article.sidebarText ? article.sidebarText : article.articleName ? article.articleName : article.name + " Quiz"}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Accordion;
