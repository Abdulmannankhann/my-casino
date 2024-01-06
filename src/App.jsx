import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Route, Routes, useNavigate } from "react-router-dom";
import TikTakToe from "./pages/TikTakToe";
import Home from "./pages/Home";
import RouletteGame from "./pages/RouletteGame";
import { WagmiConfig } from "wagmi";
import { client } from "./components/WagmiContext";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import Login from "./pages/Login";
import { Chip } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GamesIcon from "@mui/icons-material/Games";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useSelector } from "react-redux";
import Withdraw from "./pages/Withdraw";
import BitCasino from "./assets/images/bitCasino.svg";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();
  const balance = useSelector((state) => state.user.casinoPoints);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Earn more at peak hours!" : "Casino";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const drawer = (
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
        {["Tik-Tak-Toe", "Roulette"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`/${text.toLowerCase()}`);
              }}
            >
              {index == 0 && (
                <ListItemIcon>
                  <VideogameAssetIcon />
                </ListItemIcon>
              )}
              {index == 1 && (
                <ListItemIcon>
                  <GamesIcon />
                </ListItemIcon>
              )}
              {index == 2 && (
                <ListItemIcon>
                  <SmartToyIcon />
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <WagmiConfig client={client}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton size="large" color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                Casino Demo
              </Typography>
              <Chip label={`Points: ${balance}`} color="warning" />
            </Toolbar>
          </AppBar>

          <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tik-tak-toe" element={<TikTakToe />} />
              <Route path="/roulette" element={<RouletteGame />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Box>
        </Box>
      </WagmiConfig>
    </>
  );
}

export default ResponsiveDrawer;
