import React from "react";
import { useNavigate } from "react-router-dom";
import TicTacToeLogo from "../assets/images/tiktaktoe.png";
import RouletteLogo from "../assets/images/roulette.png";
import SlotsLogo from "../assets/images/slots.jpg";
import { CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Card as MuiCard } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import { muiCardStyle } from "../utils/functions";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid spacing={2} container>
        <Grid item lg={3} md={3} sm={3}>
          <MuiCard sx={muiCardStyle}>
            <CardMedia sx={{ height: 200 }} image={TicTacToeLogo} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tik Tak Toe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Win amazing prizes!
              </Typography>
            </CardContent>
            <CardActions>
              <MuiButton size="small" onClick={() => navigate("/tik-tak-toe")}>
                Play Now
              </MuiButton>
            </CardActions>
          </MuiCard>
        </Grid>

        <Grid item lg={3} md={3} sm={3}>
          <MuiCard sx={muiCardStyle}>
            <CardMedia sx={{ height: 200 }} image={RouletteLogo} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Roulette
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Win amazing prizes!
              </Typography>
            </CardContent>
            <CardActions>
              <MuiButton size="small" onClick={() => navigate("/roulette")}>
                Play Now
              </MuiButton>
            </CardActions>
          </MuiCard>
        </Grid>

        {/*<Grid item lg={3} md={3} sm={3}>
          <MuiCard sx={muiCardStyle}>
            <CardMedia sx={{ height: 200 }} image={SlotsLogo} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Slots
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Win amazing prizes!
              </Typography>
            </CardContent>
            <CardActions>
              <MuiButton size="small" onClick={() => navigate("/slots")}>
                Play Now
              </MuiButton>
            </CardActions>
          </MuiCard>
        </Grid>*/}
      </Grid>
    </>
  );
};

export default Home;
