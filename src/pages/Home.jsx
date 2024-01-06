import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TikTakToeLogo from "../assets/images/tiktaktoe.png";
import RouletteLogo from "../assets/images/roulette.png";
import SlotsLogo from "../assets/images/slots.jpg";
import Profile from "./Profile.tsx";

const Home = () => {
  const navigate = useNavigate();

  const cardImageStyle = {
    maxHeight: "250px",
    minHeight: "250px",
    objectFit: "cover",
    margin: "auto",
    display: "block",
  };

  return (
    <div className="casino-container">
      <Container>
        <Row>
          <Col lg={4} md={3}>
            <Card>
              <Card.Body>
                <div>
                  <Card.Img variant="top" src={TikTakToeLogo} style={cardImageStyle} />
                </div>
                <Card.Title>Tik Tak Toe</Card.Title>
                <Card.Text>Win amazing prizes!</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => {
                    navigate("/tik-tak-toe");
                  }}
                >
                  Play Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={3}>
            <Card>
              <Card.Body>
                <div>
                  <Card.Img variant="top" src={RouletteLogo} style={cardImageStyle} />
                </div>
                <Card.Title>Roulette</Card.Title>
                <Card.Text>Win amazing prizes!</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => {
                    navigate("/roulette");
                  }}
                >
                  Play Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={3}>
            <Card>
              <Card.Body>
                <div>
                  <Card.Img variant="top" src={SlotsLogo} style={cardImageStyle} />
                </div>
                <Card.Title>Slots</Card.Title>
                <Card.Text>Win amazing prizes!</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => {
                    navigate("/slots");
                  }}
                >
                  Play Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={3}>
            <Card>
              <Card.Body>
                <div>
                  <Card.Img variant="top" src={SlotsLogo} style={cardImageStyle} />
                </div>
                <Card.Title>Connect Wallet</Card.Title>
                <Profile />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
