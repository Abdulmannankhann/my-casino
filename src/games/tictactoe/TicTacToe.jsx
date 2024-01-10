import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, Typography } from "@mui/material";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { addPoints, removePoints } from "../../redux/userRedux";
import { marks, valuetext } from "../../utils/functions";

function TicTacToe() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [loose, setLoose] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [bet, setBet] = useState(10);
  const colors = {
    x: "#d63741",
    o: "#008000",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawBoard(ctx);
    drawXO(ctx);
    checkWinner();
  }, [board]);

  useEffect(() => {
    if (winner === "X" || winner === "O") {
      dispatch(addPoints(bet * 2));
    }
  }, [winner]);

  const drawBoard = (ctx) => {
    ctx.clearRect(0, 0, 300, 300);

    // Draw grid lines
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 1; i < 3; i++) {
      // Vertical lines
      ctx.moveTo(i * 100, 0);
      ctx.lineTo(i * 100, 300);
      // Horizontal lines
      ctx.moveTo(0, i * 100);
      ctx.lineTo(300, i * 100);
    }
    ctx.stroke();
  };

  const drawXO = (ctx) => {
    board.forEach((value, index) => {
      const x = (index % 3) * 100 + 50;
      const y = Math.floor(index / 3) * 100 + 50;

      ctx.font = "50px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (value === "X") {
        ctx.fillStyle = colors.x;
        ctx.fillText("X", x, y);
      } else if (value === "O") {
        ctx.fillStyle = colors.o;
        ctx.fillText("O", x, y);
      }
    });
  };

  const handleClick = (event) => {
    if (!startGame) {
      return;
    }
    if (winner) {
      return;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const row = Math.floor(y / 100);
    const col = Math.floor(x / 100);
    const index = row * 3 + col;

    if (!board[index]) {
      const newBoard = board.slice();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    // Check for a tie
    if (!board.includes(null)) {
      //  setWinner("Tie");
      setLoose(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(false);
    setStartGame(false);
    setLoose(false);
  };

  const handleBetChange = (event, newValue) => {
    setBet(newValue);
  };

  const handleStartGame = () => {
    setStartGame(true);
    dispatch(removePoints(bet));
  };

  return (
    <div>
      <Box>
        <Typography>
          {startGame ? "Game Started" : "Choose Bet Amount"}
          <Box sx={{ mt: 4 }}>
            <Slider size="small" value={bet} onChange={handleBetChange} disabled={startGame} aria-label="Always visible" getAriaValueText={valuetext} step={10} marks={marks} valueLabelDisplay="on" />
          </Box>
        </Typography>
        <Button size="small" disabled={startGame} onClick={handleStartGame} variant="contained" className="mb-4">
          Set Bet
        </Button>
      </Box>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="d-flex column align-items-center justify-content-center">
        <canvas ref={canvasRef} width={300} height={300} onClick={handleClick}></canvas>
        {startGame && !winner && (
          <Typography className="mt-4">
            Current Player: <strong style={{ color: currentPlayer === "X" ? colors.x : colors.o }}>{currentPlayer}</strong>
          </Typography>
        )}
      </motion.div>

      <div>
        <AnimatePresence>{winner && <Confetti width={1500} height={1019} />}</AnimatePresence>

        {/* Winning Model */}
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
    </div>
  );
}

export default TicTacToe;
