import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GamesIcon from "@mui/icons-material/Games";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ExtensionIcon from "@mui/icons-material/Extension";
import CasinoIcon from "@mui/icons-material/Casino";
import BitCasino from "../../assets/images/bitCasino.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <a href="/">
        <img src={BitCasino} alt="BitCasino" style={{ margin: 10, marginLeft: 25 }} />
      </a>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/login");
            }}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton disabled sx={{ ml: 1 }}>
            <ListItemText primary="Games" />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        {["Blackjack", "Roulette", "Tic-Tac-Toe", "Guess-My-Number", "Hold-The-Dice"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`/${text.toLowerCase()}`);
              }}
            >
              {index === 0 && (
                <ListItemIcon>
                  <VideogameAssetIcon />
                </ListItemIcon>
              )}
              {index === 1 && (
                <ListItemIcon>
                  <GamesIcon />
                </ListItemIcon>
              )}
              {index === 2 && (
                <ListItemIcon>
                  <SmartToyIcon />
                </ListItemIcon>
              )}
              {index === 3 && (
                <ListItemIcon>
                  <ExtensionIcon />
                </ListItemIcon>
              )}
              {index === 4 && (
                <ListItemIcon>
                  <CasinoIcon />
                </ListItemIcon>
              )}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton disabled sx={{ ml: 1 }}>
            <ListItemText primary="Withdraw" />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        {["Withdraw"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`/${text.toLowerCase()}`);
              }}
            >
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Navbar;
