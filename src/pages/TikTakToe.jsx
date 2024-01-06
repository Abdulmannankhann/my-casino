import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Square from "../components/Square";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, Typography } from "@mui/material";
import Confetti from "react-confetti";

function TikTakToe() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const [bet, setBet] = useState(10);

  const checkEndTheGame = () => {
    for (let square of squares) {
      if (!square) return false;
    }
    return true;
  };

  const checkWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const updateSquares = (ind) => {
    if (squares[ind] || winner) {
      return;
    }
    const s = squares;
    s[ind] = turn;
    setSquares(s);
    setTurn(turn === "x" ? "o" : "x");
    const W = checkWinner();
    if (W) {
      setWinner(W);
    } else if (checkEndTheGame()) {
      setWinner("x | o");
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
    setStartGame(false);
  };

  const marks = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 40,
      label: "40",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 60,
      label: "60",
    },
    {
      value: 70,
      label: "70",
    },
    {
      value: 80,
      label: "80",
    },
    {
      value: 90,
      label: "90",
    },
    {
      value: 100,
      label: "100",
    },
  ];

  function valuetext(value) {
    return `${value}`;
  }

  const handleStartGame = () => {
    setStartGame(true);
  };

  const handleBetChange = (event, newValue) => {
    setBet(newValue);
  };

  return (
    <div className="tic-tac-toe">
      <Box>
        <Typography>
          {startGame ? "Game Started" : "Choose Bet Amount"}
          <Box sx={{ mt: 4 }}>
            <Slider value={bet} onChange={handleBetChange} disabled={startGame} aria-label="Always visible" getAriaValueText={valuetext} step={10} marks={marks} valueLabelDisplay="on" />
          </Box>
        </Typography>
      </Box>
      <Button disabled={startGame} onClick={handleStartGame} variant="contained" className="mb-4">
        Start Game
      </Button>
      <div className="game">
        {Array.from("012345678").map((ind) => (
          <Square key={ind} ind={ind} updateSquares={updateSquares} clsName={squares[ind]} startGame={startGame} />
        ))}
      </div>
      <div className={`turn ${turn === "x" ? "left" : "right"}`}>
        <Square clsName="x" />
        <Square clsName="o" />
      </div>
      <AnimatePresence>
        {winner && (
          //  <motion.div key={"parent-box"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="winner">
          //    <motion.div key={"child-box"} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }} className="text">
          //      <motion.h2
          //        initial={{ scale: 0, y: 100 }}
          //        animate={{
          //          scale: 1,
          //          y: 0,
          //          transition: {
          //            y: { delay: 0.7 },
          //            duration: 0.7,
          //          },
          //        }}
          //      >
          //        {winner === "x | o" ? "No Winner :/" : "Win !! :)"}
          //      </motion.h2>
          //      <motion.div
          //        initial={{ scale: 0 }}
          //        animate={{
          //          scale: 1,
          //          transition: {
          //            delay: 1.3,
          //            duration: 0.2,
          //          },
          //        }}
          //        className="win"
          //      >
          //        {winner === "x | o" ? (
          //          <>
          //            <Square clsName="x" />
          //            <Square clsName="o" />
          //          </>
          //        ) : (
          //          <>
          //            <Square clsName={winner} />
          //          </>
          //        )}
          //      </motion.div>
          //      <motion.div
          //        initial={{ scale: 0 }}
          //        animate={{
          //          scale: 1,
          //          transition: { delay: 1.5, duration: 0.3 },
          //        }}
          //      >
          //        <Button onClick={resetGame} variant="dark">
          //          ok
          //        </Button>
          //      </motion.div>
          //    </motion.div>
          //  </motion.div>
          <div>
            <Confetti width={1600} height={1019} />
          </div>
        )}
      </AnimatePresence>
      <Dialog open={winner} onClose={resetGame} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Congratulations 🎉</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You got {bet * 2} casino points!</DialogContentText>
          <DialogContentText id="alert-dialog-description">Play more to earn more!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetGame}>Continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TikTakToe;
