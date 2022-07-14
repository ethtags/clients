import React from "react";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


class ETNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="light">
        {/* Home & Tagline */}
        <Container className="justify-content-start">
          <Navbar.Brand as={Link} to="/">ETHTags</Navbar.Brand>
          <Navbar.Text>Crowdsourced Nametags</Navbar.Text>
        </Container>

        {/* Socials */}
        <Container className="justify-content-end">
          <Navbar.Brand href="#">
            <FontAwesomeIcon icon={faDiscord} color="#5865f2" />
          </Navbar.Brand>
          <Navbar.Brand href="#">
            <FontAwesomeIcon icon={faTelegram} color="#24a1de" />
          </Navbar.Brand>
          <Navbar.Brand href="#">
            <FontAwesomeIcon icon={faTwitter} color="#1d9bf0" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    )
  }
}


export default ETNavbar;
