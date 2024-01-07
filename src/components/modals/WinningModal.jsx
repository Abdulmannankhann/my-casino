import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import Confetti from "react-confetti";

const WinningModal = ({ winner, resetGame, bet }) => {
  return (
    <>
      {winner && <Confetti width={1600} height={1019} />}
      <Dialog open={winner} onClose={resetGame} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Congratulations 🎉</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{bet * 2} casino points added to your wallet points!</DialogContentText>
          <DialogContentText id="alert-dialog-description">Play more to earn more!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetGame}>Continue</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WinningModal;
