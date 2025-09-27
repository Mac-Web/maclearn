import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { mode, github, close, articles } from "../assets/assets";
import { Link } from "react-router";

function NavBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [matchedArticles, setMatchedArticles] = useState([]);
  const [lightMode, setLightMode] = useState(localStorage.getItem("mode") ? JSON.parse(localStorage.getItem("mode")) : false);
  const inputSearch = useRef();
  const searchContainerRef = useRef();

  function handleNavSearch(e) {
    const value = e.target.value;
    setSearchValue(value);
  }

  useEffect(() => {
    if (searchValue.trim().length == 0) {
      setMatchedArticles([]);
      return;
    }
    const allArticles = [...articles.html, ...articles.css, ...articles.references];
    setMatchedArticles(
      allArticles.filter((article) => article.articleName.toLowerCase().includes(searchValue.toLowerCase())).splice(0, 5)
    );
  }, [searchValue]);

  useEffect(() => {
    lightMode ? document.body.classList.add("light") : document.body.classList.remove("light");
    localStorage.setItem("mode", lightMode);
  }, [lightMode]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearching(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <img src="/logo.png" /> MacLearn
      </Link>
      <div className="nav-search-container" ref={searchContainerRef}>
        <div className="nav-search-bar">
          <input
            type="text"
            className="nav-search"
            placeholder="Search articles"
            value={searchValue}
            onChange={handleNavSearch}
            onFocus={() => setSearching(true)}
            ref={inputSearch}
          />
          {searchValue.length > 0 && (
            <img
              src={close}
              title="Clear search"
              className="nav-search-img"
              onClick={() => {
                setSearchValue("");
                inputSearch.current.focus();
              }}
            />
          )}
        </div>
        {matchedArticles.length > 0 && searching && (
          <div className="nav-search-results">
            {matchedArticles.map((article) => {
              let course;
              if (articles.html.includes(article)) course = "html";
              if (articles.css.includes(article)) course = "css";
              if (articles.references.includes(article)) course = "references";
              return (
                <Link to={`/${course}/${article.id}`} className="search-article">
                  {article.articleName}
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <Link to="/html" className="nav-link">
        HTML
      </Link>
      <Link to="/css" className="nav-link">
        CSS
      </Link>
      <Link to="/references" className="nav-link">
        References
      </Link>
      <Link to="/playground" className="nav-link">
        Playground
      </Link>
      <Link to="/me" className="nav-link">
        Me
      </Link>
      <motion.img
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 1.1, rotate: 320 }}
        transition={{ duration: 0.7, type: "spring" }}
        src={mode}
        title="Toggle light mode"
        className="nav-img"
        onClick={() => setLightMode(!lightMode)}
      />{" "}
      <motion.img
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 1.1, rotate: 320 }}
        transition={{ duration: 0.7, type: "spring" }}
        src={github}
        title="Source code"
        className="nav-img"
        onClick={() => window.open("https://github.com/Mac-Web/maclearn", "_blank")}
      />
    </nav>
  );
}

export default NavBar;
