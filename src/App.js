import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TikTakToe from "./pages/TikTakToe";
import RouletteGame from "./pages/RouletteGame";
import Appbar from "./components/Appbar";
import "./App.css";
import Slots from "./pages/Slots";
import { client } from "./components/WagmiContext";
import { WagmiConfig } from "wagmi";

const App = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Win more!" : "Bombay Live";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <WagmiConfig client={client}>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tik-tak-toe" element={<TikTakToe />} />
          <Route path="/roulette" element={<RouletteGame />} />
          <Route path="/slots" element={<Slots />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </WagmiConfig>
    </BrowserRouter>
  );
};

export default App;
