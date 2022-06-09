import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";


class ETNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="light">
        <Container className="justify-content-start">
          <Navbar.Brand href="#home">ETH Tags</Navbar.Brand>
          <Navbar.Text>Tag the chain!</Navbar.Text>
        </Container>
      </Navbar>
    )
  }
}


export default ETNavbar;
