import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Square from "../../components/tictactoe/Square";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, Typography } from "@mui/material";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { addPoints, removePoints } from "../../redux/userRedux";
import { marks } from "../../utils/functions";

function TikTakToe() {
  const dispatch = useDispatch();
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const [loose, setLoose] = useState(false);
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
      dispatch(addPoints(bet * 2));
    } else if (checkEndTheGame()) {
      setWinner(false);
      setLoose(true);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
    setStartGame(false);
    setLoose(false);
  };

  function valuetext(value) {
    return `${value}`;
  }

  const handleStartGame = () => {
    setStartGame(true);
    dispatch(removePoints(bet));
  };

  const handleBetChange = (event, newValue) => {
    setBet(newValue);
  };

  return (
    <>
      <Box>
        <Typography>
          {startGame ? "Game Started" : "Choose Bet Amount"}
          <Box sx={{ mt: 4 }}>
            <Slider value={bet} onChange={handleBetChange} disabled={startGame} aria-label="Always visible" getAriaValueText={valuetext} step={10} marks={marks} valueLabelDisplay="on" />
          </Box>
        </Typography>
        <Button disabled={startGame} onClick={handleStartGame} variant="contained" className="mb-4">
          Set Bet
        </Button>
      </Box>

      <div className="tic-tac-toe">
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
            <div>
              <Confetti width={1600} height={1019} />
            </div>
          )}
        </AnimatePresence>
        <Dialog open={winner} onClose={resetGame} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Congratulations 🎉 {winner} wins!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{bet * 2} casino points addedd to your wallet points!</DialogContentText>
            <DialogContentText id="alert-dialog-description">Play more to earn more!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={resetGame}>Continue</Button>
          </DialogActions>
        </Dialog>

        {/* Loosing Model */}
        <Dialog open={loose} onClose={resetGame} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Opps 👎</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Oops, you lost!</DialogContentText>
            <DialogContentText id="alert-dialog-description">Better luck next time!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={resetGame}>Continue</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default TikTakToe;
