import { Link } from "react-router";
import { motion } from "framer-motion";

function Card({ link, img = null, name, description = null, blank = false, progress = null }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      <Link to={link} className="card" target={blank ? "_blank" : ""}>
        {img && <img src={img} className="card-img" />}
        <h3 className="card-name">{name}</h3>
        {description && <p className="card-description">{description}</p>}
        {progress !== null && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress" style={{ width: progress + "%" }}></div>
            </div>
            {progress}%
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export default Card;
