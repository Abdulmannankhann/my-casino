import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import Profile from "./Profile.tsx";
import { muiCardStyle } from "../components/MuiStyles.js";

const Login = () => {
  return (
    <>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card sx={muiCardStyle}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Login via MetaMask
              </Typography>
            </CardContent>
            <CardActions>
              <Profile />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
