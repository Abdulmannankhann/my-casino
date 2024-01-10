import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes } from "react-router-dom";
import TicTacToe from "./games/tictactoe/TicTacToe.jsx";
import Home from "./pages/Home";
import RouletteGame from "./games/roulette/RouletteGame.jsx";
import { WagmiConfig } from "wagmi";
import { client } from "./components/wagmi/WagmiContext.jsx";
import Login from "./pages/Login";
import Withdraw from "./pages/Withdraw";
import GuessMyNumber from "./games/guessMyNumber/GuessMyNumber.jsx";
import Tenzies from "./games/tenzies/Tenzies.jsx";
import BlackJack from "./games/blackjack/BlackJack.tsx";
import NavbarLayout from "./components/navbar/NavbarLayout.jsx";

const drawerWidth = 240;

function App() {
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Bitcasino Clone - Earn more at peak hours!" : "Bitcasino Clone - First Licensed Crypto Casino | Bitcasino.io";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <WagmiConfig client={client}>
        <Box sx={{ display: "flex" }}>
          <NavbarLayout drawerWidth={drawerWidth} />
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tic-tac-toe" element={<TicTacToe />} />
              <Route path="/roulette" element={<RouletteGame />} />
              <Route path="/guess-my-number" element={<GuessMyNumber />} />
              <Route path="/hold-the-dice" element={<Tenzies />} />
              <Route path="/blackjack" element={<BlackJack />} />
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

export default App;
