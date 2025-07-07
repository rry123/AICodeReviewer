import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FiSun, FiMoon } from 'react-icons/fi';

function CustomNavbar({ theme, toggleTheme }) {
  return (
    <Navbar bg={theme === "dark" ? "dark" : "light"} variant={theme === "dark" ? "dark" : "light"}>
      <Container>
        <Navbar.Brand href="#">AI Code Reviewer</Navbar.Brand>
        <Nav className="ms-auto">
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              color: theme === "dark" ? "#fff" : "#000",
              cursor: "pointer"
            }}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
