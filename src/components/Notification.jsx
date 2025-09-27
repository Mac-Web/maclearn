import { motion } from "framer-motion";

function Notification({ text }) {
  return (
    <motion.div initial={{ x: 200 }} animate={{ x: 0 }} exit={{ x: 500 }} className="notification">
      {text}
    </motion.div>
  );
}

export default Notification;
