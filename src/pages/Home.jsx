import React from "react";
import { useNavigate } from "react-router-dom";
import BlackjackLogo from "../assets/images/blackjack.png";
import RouletteLogo from "../assets/images/roulette.png";
import TicTacToeLogo from "../assets/images/tiktaktoe.png";
import GuessMyNumberLogo from "../assets/images/guessmynumber.jpg";
import HoldTheDiceLogo from "../assets/images//tenzies.png";
import { CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import { muiCardStyle } from "../utils/functions";

const games = [
  {
    id: 1,
    name: "Blackjack",
    route: "blackjack",
    logo: BlackjackLogo,
    bannerText: "Win amazing prizes!",
  },
  {
    id: 2,
    name: "Roulette",
    route: "roulette",
    logo: RouletteLogo,
    bannerText: "Unlock incredible rewards!",
  },
  {
    id: 3,
    name: "Tic Tac Toe",
    route: "tic-tac-toe",
    logo: TicTacToeLogo,
    bannerText: "Seize awesome prizes!",
  },
  {
    id: 4,
    name: "Guess My Number",
    route: "guess-my-number",
    logo: GuessMyNumberLogo,
    bannerText: "Claim spectacular winnings!",
  },
  {
    id: 5,
    name: "Hold The Dice",
    route: "hold-the-dice",
    logo: HoldTheDiceLogo,
    bannerText: "Snag marvelous rewards!",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid spacing={2} container>
        {games.map((game) => {
          return (
            <Grid item key={game.id}>
              <Card sx={muiCardStyle}>
                <CardMedia sx={{ height: 150, width: 200 }} image={game.logo} />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {game.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {game.bannerText}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/${game.route}`)} variant="contained">
                    Play Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
