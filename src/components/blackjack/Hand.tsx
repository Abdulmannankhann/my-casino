import React from "react";
import Card from "./Card.tsx";
import { Typography } from "@mui/material";

type HandProps = {
  title: string;
  cards: any[];
};

const Hand: React.FC<HandProps> = ({ title, cards }) => {
  const getTitle = () => {
    if (cards.length > 0) {
      return (
        <Typography>
          <strong>{title}</strong>
        </Typography>
      );
    }
  };
  return (
    <div className="d-flex column align-items-center m-2">
      {getTitle()}
      <div className="d-flex justify-content-center flex-wrap">
        {cards.map((card: any, index: number) => {
          return <Card key={index} value={card.value} suit={card.suit} hidden={card.hidden} />;
        })}
      </div>
    </div>
  );
};

export default Hand;
