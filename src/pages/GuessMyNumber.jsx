import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const GuessMyNumber = () => {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
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
  };

  return (
    <div>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {message} - (Betweeen 1 to 20)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Score: {score}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Highscore: {highScore}
              </Typography>
              <TextField id="standard-basic" label="Enter your number" variant="standard" value={guess} onChange={(e) => setGuess(e.target.value)} />
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={checkGuess} disabled={isGameEnded}>
                Check
              </Button>
              {isGameEnded && (
                <Button variant="contained" onClick={playAgain}>
                  Play Again
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default GuessMyNumber;
