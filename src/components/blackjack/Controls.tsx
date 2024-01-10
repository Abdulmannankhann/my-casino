import React, { useState, useEffect } from "react";
import { Box, Button, Slider, Stack, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { marks, valuetext } from "../../utils/functions";

type ControlsProps = {
  bet: any;
  startGame: any;
  setStartGame: any;
  gameState: any;
  buttonState: any;
  betEvent: any;
  hitEvent: any;
  standEvent: any;
  resetEvent: any;
};

const Controls: React.FC<ControlsProps> = ({ startGame, setStartGame, gameState, buttonState, bet, betEvent, hitEvent, standEvent, resetEvent }) => {
  const [amount, setAmount] = useState(10);
  const balance = useSelector((state: any) => state.user.casinoPoints);

  useEffect(() => {
    validation();
  }, [amount, balance]);

  const validation = () => {
    if (amount > balance) {
      return false;
    }
    if (amount < 0.01) {
      return false;
    }
    return true;
  };

  const amountChange = (event, newValue) => {
    setAmount(newValue);
  };

  const onBetClick = () => {
    if (validation()) {
      setStartGame(true);
      betEvent(Math.round(amount * 100) / 100);
    }
  };

  const getControls = () => {
    return (
      <>
        <Box className="mt-2">
          <Typography>
            {startGame ? "Game Started" : "Choose Bet Amount"}
            <Box sx={{ mt: 4 }}>
              <Slider size="small" value={amount} onChange={amountChange} disabled={startGame} aria-label="Always visible" getAriaValueText={valuetext} step={10} marks={marks} valueLabelDisplay="on" />
            </Box>
          </Typography>
          <Button size="small" disabled={startGame} onClick={() => onBetClick()} variant="contained" className="mb-4">
            Bet
          </Button>
        </Box>
        {gameState !== 0 && (
          <Stack direction="row" spacing={1} className="mt-1 d-flex justify-content-center">
            <Button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} variant="contained" size="small">
              Hit
            </Button>
            <Button onClick={() => standEvent()} disabled={buttonState.standDisabled} variant="contained" size="small">
              Stand
            </Button>
            <Button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} variant="contained" size="small">
              Reset
            </Button>
          </Stack>
        )}
      </>
    );
  };

  return <>{getControls()}</>;
};

export default Controls;
