import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const Appbar = () => {
  const location = useLocation();
  const [activeState, setActiveState] = useState(location.pathname);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleNavClose = () => {
    setIsNavExpanded(false);
  };

  useEffect(() => {
    if (location.pathname !== activeState) {
      setActiveState(location.pathname);
    }
  }, [activeState, location]);

  return (
    <Navbar collapseOnSelect expand="md" className={`px-4 bg-dark`} fixed="top" expanded={isNavExpanded}>
      <Navbar.Brand href="/" className="text-light">
        Casino Games
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setIsNavExpanded(!isNavExpanded)} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className={`my-navbar-link ${activeState === "/" ? "highlight-link text-light" : "text-light"}`} onClick={handleNavClose}>
            Home
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text className="d-none d-lg-block text-light">Developed by: Abdul Mannan Khan</Navbar.Text>
    </Navbar>
  );
};

export default Appbar;
