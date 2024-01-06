import "./Square.css";
import { motion } from "framer-motion";

const Square = ({ ind, updateSquares, clsName, startGame }) => {
  const handleClick = () => {
    if (!startGame) {
      alert("Click Start game to set your bet!");
      return;
    }
    updateSquares(ind);
  };
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="square" onClick={handleClick}>
      {clsName && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className={clsName}></motion.span>}
    </motion.div>
  );
};

export default Square;
