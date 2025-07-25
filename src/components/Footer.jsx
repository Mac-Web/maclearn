import { Link } from "react-router";
import { logo, email, youtube, github, discord } from "../assets/assets";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-column">
        <Link to="/" className="footer-logo">
          <img src={logo} /> MacLearn
        </Link>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://mac-web.github.io" target="_blank">
            MacWeb
          </a>
        </div>
        <div className="footer-copy">All rights reserved</div>
        <div className="footer-copy">
          Made with ❤️ by{" "}
          <a href="https://github.com/tonymac129/" target="_blank">
            Tony Macaroni
          </a>
        </div>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">Browse Tabs</h2>
        <Link to="/" className="footer-link">
          Home
        </Link>
        <Link to="/html" className="footer-link">
          HTML
        </Link>
        <Link to="/css" className="footer-link">
          CSS
        </Link>
        <Link to="/references" className="footer-link">
          References
        </Link>
        <Link to="/playground" className="footer-link">
          Playground
        </Link>
        <Link to="/me" className="footer-link">
          Me
        </Link>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">MacLearn Information</h2>
        <Link to="https://mac-web.github.io/macblog/apps/maclearn" className="footer-link" target="_blank">
          About
        </Link>
        <Link to="https://mac-web.github.io/macblog/#/apps/maclearn/updates" className="footer-link" target="_blank">
          Updates
        </Link>
        <a href="https://forms.gle/P5QfiZFgZ3KURdbJ8" className="footer-link" target="_blank">
          Feedback
        </a>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">MacWeb Apps</h2>
        <a href="https://mac-web.github.io/" className="footer-link" target="_blank">
          MacWeb
        </a>
        <a href="https://mac-web.github.io/macvg/" className="footer-link" target="_blank">
          MacVG
        </a>
        <a href="https://mac-web.github.io/macideas/" className="footer-link" target="_blank">
          MacIdeas
        </a>
        <a href="https://mac-web.github.io/mactools/" className="footer-link" target="_blank">
          MacTools
        </a>
        <a href="https://mac-web.github.io/macblog/" className="footer-link" target="_blank">
          MacBlog
        </a>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">Social</h2>
        <div className="footer-social">
          <a href="mailto:mac.web.company@gmail.com" target="_blank" className="footer-icon" title="Email us">
            <img src={email} />
          </a>
          <a href="https://www.youtube.com/@Mac-Web" target="_blank" className="footer-icon" title="YouTube">
            <img src={youtube} />
          </a>
          <a href="https://github.com/Mac-Web/maclearn" target="_blank" className="footer-icon" title="Source code">
            <img src={github} />
          </a>
          <a href="https://discord.gg/UT7g2S2cBP" target="_blank" className="footer-icon" title="Join our server!">
            <img src={discord} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
