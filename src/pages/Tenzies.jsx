import React from "react";
import Die from "../components/Die";
import { nanoid } from "nanoid";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

const Tenzies = () => {
  const [start, setStart] = React.useState(false);

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [best, setBest] = React.useState(JSON.parse(localStorage.getItem("best")) || 0);
  const [bestTime, setBestTime] = React.useState(JSON.parse(localStorage.getItem("time")) || 0);

  const [startTime, setStartTime] = React.useState(null);
  const [now, setNow] = React.useState(null);

  const intervalRef = React.useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
    if (secondsPassed < bestTime || bestTime == 0) {
      localStorage.setItem("time", secondsPassed);
      setBestTime(secondsPassed);
    }
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      handleStop();
      if (rolls < best || best === 0) {
        localStorage.setItem("best", rolls);
        setBest(rolls);
      }
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (start) {
      if (!tenzies) {
        setDice((oldDice) =>
          oldDice.map((die) => {
            return die.isHeld ? die : generateNewDie();
          }),
        );
        setRolls(rolls + 1);
      } else {
        handleStart();
        setRolls(0);
        setTenzies(false);
        setDice(allNewDice());
      }
    } else {
      setRolls(1);
      setStart(true);
      handleStart();
    }
  }

  function holdDice(id) {
    if (start) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        }),
      );
    }
  }

  const diceElements = dice.map((die) => <Die {...die} started={start} holdDice={() => holdDice(die.id)} />);
  return (
    <>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card sx={{ p: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                🎲Tenzies
              </Typography>
              <div className="d-flex justify-content-between mb-3">
                <div className="timer">Current Time: {secondsPassed.toFixed(2)}s</div>
                {bestTime !== 0 && (
                  <div>
                    <Typography>
                      Best Time:{" "}
                      <span>
                        <strong>{bestTime}s</strong>
                      </span>
                    </Typography>
                  </div>
                )}
              </div>
              <Typography variant="body2" color="text.secondary" className="mb-3">
                Roll until all dice are the same.
                <br />
                Click each die to freeze it at its current value between rolls.
              </Typography>
              <div className="dice-container mb-5">{diceElements}</div>

              <div className="d-flex justify-content-between">
                <Typography>
                  Rolls: <span>{rolls}</span>
                </Typography>
                {best !== 0 && (
                  <Typography>
                    Best:{" "}
                    <span>
                      <strong>{best}</strong>
                    </span>
                  </Typography>
                )}
              </div>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={rollDice}>
                {!start ? "Start Game" : tenzies ? "New Game" : "Roll"}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Tenzies;
