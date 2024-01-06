import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import WagmiLogin from "./WagmiLogin.tsx";
import { muiCardShadow } from "../components/MuiStyles.js";

const Login = () => {
  return (
    <>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card sx={{ ...muiCardShadow, p: 1 }}>
            <CardContent>
              <Typography variant="h5">Login In</Typography>
            </CardContent>
            <CardActions>
              <WagmiLogin />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
