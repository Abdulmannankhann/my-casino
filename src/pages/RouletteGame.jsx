import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, Stack, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { bettingMarks, isOddOrEven, marks } from "../utils/functions";
import Tabs from "@mui/material/Tabs";
import Confetti from "react-confetti";
import Tab from "@mui/material/Tab";
import { useDispatch } from "react-redux";
import { addPoints, removePoints } from "../redux/userRedux";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const data = [
  { option: "0" },
  { option: "1" },
  { option: "2" },
  { option: "3" },
  { option: "4" },
  { option: "5" },
  { option: "6" },
  { option: "7" },
  { option: "8" },
  { option: "9" },
  { option: "10" },
  { option: "11" },
  { option: "12" },
  { option: "13" },
  { option: "14" },
  { option: "15" },
  { option: "16" },
  { option: "17" },
  { option: "18" },
  { option: "19" },
  { option: "20" },
  { option: "21" },
  { option: "22" },
  { option: "23" },
  { option: "24" },
  { option: "25" },
  { option: "26" },
  { option: "27" },
  { option: "28" },
  { option: "29" },
  { option: "30" },
  { option: "31" },
  { option: "32" },
  { option: "33" },
  { option: "34" },
  { option: "35" },
  { option: "36" },
];

const backgroundColors = ["#e74c3c", "#111111"];
const textColors = ["#eeeeee"];
const outerBorderColor = "#eeeeee";
const outerBorderWidth = 10;
const innerBorderColor = "#30261a";
const innerBorderWidth = 20;
const innerRadius = 2;
const radiusLineColor = "#eeeeee";
const radiusLineWidth = 4;
const fontFamily = "Nunito";
const fontWeight = "bold";
const fontSize = 12;
const fontStyle = "normal";

const RouletteGame = () => {
  const dispatch = useDispatch();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [bet, setBet] = useState(10);
  const [bettingCategory, setBettingCategory] = useState(0);
  const [bettingNumber, setBettingNumber] = useState(null);
  const [winner, setWinner] = useState(false);
  const [loose, setLoose] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  function valuetext(value) {
    return `${value}`;
  }

  const handleStartGame = () => {
    if (bettingCategory === 0 && !bettingNumber) {
      alert("choose a bet between Odd & Even!");
      return;
    }

    setStartGame(true);
    handleSpinClick();
    dispatch(removePoints(bet));
  };

  const handleBetChange = (event, newValue) => {
    setBet(newValue);
  };

  const handleSingleBetNumberChange = (event, newValue) => {
    setBettingNumber(newValue);
  };

  const handleChange = (event, newValue) => {
    setBettingCategory(newValue);
  };

  const checkWinner = () => {
    if (bettingCategory === 0) {
      //Odd-Even
      if (isOddOrEven(prizeNumber) && bettingNumber === "even") {
        setWinner(true);
        dispatch(addPoints(bet * 2));
      } else if (!isOddOrEven(prizeNumber) && bettingNumber === "odd") {
        setWinner(true);
        dispatch(addPoints(bet * 2));
      } else {
        setLoose(true);
      }
    }
    if (bettingCategory === 1) {
      //Single Number
      if (bettingNumber == prizeNumber) {
        setWinner(true);
        dispatch(addPoints(bet * 2));
      } else {
        setLoose(true);
      }
    }
  };

  const resetGame = () => {
    setLoose(false);
    setWinner(false);
    setBettingNumber(0);
    setStartGame(false);
  };

  return (
    <div>
      <Box>
        <Typography>
          {startGame ? "Game Started" : "Choose Bet Amount"}
          <Box sx={{ mt: 4 }}>
            <Slider value={bet} onChange={handleBetChange} disabled={startGame} aria-label="Always visible" getAriaValueText={valuetext} step={10} marks={marks} valueLabelDisplay="on" />
          </Box>
        </Typography>
        <Button disabled={startGame} onClick={handleStartGame} variant="contained" className="mb-4">
          Spin Wheel
        </Button>
      </Box>

      <div className="d-flex align-items-center justify-content-center">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            checkWinner();
          }}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontStyle={fontStyle}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
        />
      </div>

      {/* betting area */}
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={bettingCategory} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Odd / Even" {...a11yProps(0)} disabled={startGame} />
            <Tab
              disabled={startGame}
              label="Single Number"
              {...a11yProps(1)}
              onClick={() => {
                setBettingNumber(0);
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={bettingCategory} index={0}>
          <ButtonGroup className="d-flex align-items-center justify-content-center">
            <Button
              variant={bettingNumber === "odd" ? "contained" : "outlined"}
              disabled={startGame}
              onClick={() => {
                setBettingNumber("odd");
              }}
            >
              Odd
            </Button>
            <Button disabled>Choose Option</Button>
            <Button
              disabled={startGame}
              variant={bettingNumber === "even" ? "contained" : "outlined"}
              onClick={() => {
                setBettingNumber("even");
              }}
            >
              Even
            </Button>
          </ButtonGroup>
        </CustomTabPanel>
        <CustomTabPanel value={bettingCategory} index={1}>
          <Box>
            <Typography>
              Choose any one number
              <Box sx={{ mt: 4 }}>
                <Slider value={bettingNumber} onChange={handleSingleBetNumberChange} disabled={startGame} aria-label="Always visible" getAriaValueText={valuetext} step={1} marks={bettingMarks()} valueLabelDisplay="on" max={36} />
              </Box>
            </Typography>
          </Box>
        </CustomTabPanel>
      </Box>

      {winner && (
        <div>
          <Confetti width={1600} height={1019} />
        </div>
      )}

      {/* Winning Model */}
      <Dialog open={winner} onClose={resetGame} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Congratulations 🎉</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>
              Its {isOddOrEven(prizeNumber) ? "Even" : "Odd"}: {prizeNumber}
            </strong>
            , {bet * 2} casino points added to your wallet points!
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">Play more to earn more!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetGame}>Continue</Button>
        </DialogActions>
      </Dialog>

      {/* Loosing Model */}
      <Dialog open={loose} onClose={resetGame} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Opps 👎</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Oops, you lost!, its
            <strong>
              {isOddOrEven(prizeNumber) ? "Even" : "Odd"}: {prizeNumber}
            </strong>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">Better luck next time!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetGame}>Continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RouletteGame;
