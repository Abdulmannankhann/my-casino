import React, { useState, useEffect } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

type ControlsProps = {
  gameState: any;
  buttonState: any;
  betEvent: any;
  hitEvent: any;
  standEvent: any;
  resetEvent: any;
};

const Controls: React.FC<ControlsProps> = ({ gameState, buttonState, betEvent, hitEvent, standEvent, resetEvent }) => {
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

  const amountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const onBetClick = () => {
    if (validation()) {
      betEvent(Math.round(amount * 100) / 100);
    }
  };

  const getControls = () => {
    if (gameState === 0) {
      return (
        <div>
          <div className="d-flex align-items-center justify-content-center m-4">
            <Typography className="mx-3">Amount:</Typography>
            <TextField autoFocus type="number" value={amount} onChange={amountChange} />
          </div>
          <Button onClick={() => onBetClick()} variant="contained">
            Bet
          </Button>
        </div>
      );
    } else {
      return (
        <Stack direction="row" spacing={2} className="mt-4">
          <Button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} variant="contained">
            Hit
          </Button>
          <Button onClick={() => standEvent()} disabled={buttonState.standDisabled} variant="contained">
            Stand
          </Button>
          <Button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} variant="contained">
            Reset
          </Button>
        </Stack>
      );
    }
  };

  return <>{getControls()}</>;
};

export default Controls;
