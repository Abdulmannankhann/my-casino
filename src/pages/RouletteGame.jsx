import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

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
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };
  console.log(prizeNumber);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
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
        <button onClick={handleSpinClick}>SPIN</button>
      </div>
    </div>
  );
};

export default RouletteGame;
