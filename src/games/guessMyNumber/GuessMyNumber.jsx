import { Box, Button, Card, CardActions, CardContent, Grid, Slider, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { marks, valuetext } from "../../utils/functions";

const GuessMyNumber = () => {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [bet, setBet] = useState(10);
  const [startGame, setStartGame] = useState(false);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("🤔 Start guessing...");
  const [isGameEnded, setIsGameEnded] = useState(false);

  function generateRandomNumber() {
    return Math.trunc(Math.random() * 20) + 1;
  }

  const checkGuess = () => {
    const parsedGuess = Number(guess);

    if (!parsedGuess) {
      setMessage("No Number!!!");
    } else if (parsedGuess === secretNumber) {
      setMessage("Correct Answer!!!");
      if (score > highScore) {
        setHighScore(score);
      }
      setIsGameEnded(true);
    } else if (parsedGuess !== secretNumber) {
      if (score > 1) {
        setMessage(parsedGuess > secretNumber ? "Too High!!!" : "Too Low!!!");
        setScore((prevScore) => prevScore - 1);
      } else {
        setMessage("You lost the game!");
        setScore(0);
        setIsGameEnded(true);
      }
    }
  };

  const playAgain = () => {
    setScore(20);
    setMessage("Start guessing...!!!");
    setGuess("");
    setSecretNumber(generateRandomNumber());
    setIsGameEnded(false);
    setStartGame(false);
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
            <Slider size="small" value={bet} onChange={handleBetChange} disabled={startGame} aria-label="Always visible" getAriaValueText={valuetext} step={10} marks={marks} valueLabelDisplay="on" />
          </Box>
        </Typography>
        <Button size="small" disabled={startGame} onClick={() => setStartGame(true)} variant="contained" className="mb-4">
          Bet
        </Button>
      </Box>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card sx={{ p: 1 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {message} - (Betweeen 1 to 20)
                </Typography>
                <div className="d-flex justify-content-between">
                  <Typography variant="h6" color="text.secondary">
                    Score: <strong>{score}</strong>
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Highscore: <strong>{highScore}</strong>
                  </Typography>
                </div>
                {startGame && <TextField label="Enter your number" variant="standard" value={guess} onChange={(e) => setGuess(e.target.value)} className="mt-2" />}
              </CardContent>
              <CardActions>
                {startGame && (
                  <Button size="small" variant="contained" onClick={checkGuess} disabled={isGameEnded}>
                    Check
                  </Button>
                )}
                {isGameEnded && (
                  <Button size="small" variant="contained" onClick={playAgain}>
                    Play Again
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </>
  );
};

export default GuessMyNumber;
