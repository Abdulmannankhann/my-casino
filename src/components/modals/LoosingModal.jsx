import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

const LoosingModal = ({ loose, resetGame }) => {
  return (
    <>
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
    </>
  );
};

export default LoosingModal;
