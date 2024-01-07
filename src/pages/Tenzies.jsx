import React from "react";
import Die from "../components/Die";
import { nanoid } from "nanoid";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

const Tenzies = () => {
  const [tenzies, setTenzies] = React.useState(false);
  const [dice, setDice] = React.useState(allNewDice());
  const diceElements = dice.map((die) => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />);

  function generateNewDice() {
    return {
      value: Math.trunc(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        }),
      );
    } else {
      setTenzies(false);
      setDice(allNewDice);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      }),
    );
  }

  React.useEffect(
    function () {
      const allHeld = dice.every((die) => die.isHeld === true);
      const firstDice = dice[0].value;
      const allDiceEqual = dice.every((die) => die.value === firstDice);
      if (allHeld && allDiceEqual) {
        setTenzies(true);
        console.log("You Won!");
      }
    },
    [dice],
  );

  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Card sx={{ p: 1 }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              🎲Tenzies
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </Typography>
            <div className="dice-container mt-3">{diceElements}</div>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={rollDice}>
              {tenzies ? "New Game" : "Roll"}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Tenzies;
