import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { muiCardStyle } from "../components/MuiStyles.js";
import MetaMaskLogo from "../assets/images/metamask.svg";

const Withdraw = () => {
  return (
    <>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card sx={muiCardStyle}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Withdraw to your MetaMask Wallet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Coming soon!
              </Typography>
            </CardContent>
            <CardActions>
              <Button disabled variant="contained" startIcon={<img src={MetaMaskLogo} alt="metamask" />}>
                Request Withdraw
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Withdraw;
