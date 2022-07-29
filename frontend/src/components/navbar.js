import React from "react";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


function ETNavbar() {
  return (
    <Navbar bg="light">
      {/* Home & Tagline */}
      <Container className="justify-content-start">
        <Navbar.Brand as={Link} to="/">ETHTags</Navbar.Brand>
        <Navbar.Text>Crowdsourced Nametags</Navbar.Text>
      </Container>

      {/* Socials */}
      <Container className="justify-content-end">
        <Navbar.Brand href="https://discord.gg/z4US5gWK" target="_blank">
          <FontAwesomeIcon icon={faDiscord} color="#5865f2" />
        </Navbar.Brand>
        <Navbar.Brand href="https://t.me/ethtags" target="_blank">
          <FontAwesomeIcon icon={faTelegram} color="#24a1de" />
        </Navbar.Brand>
        <Navbar.Brand href="https://twitter.com/ethtags" target="_blank">
          <FontAwesomeIcon icon={faTwitter} color="#1d9bf0" />
        </Navbar.Brand>
        <Navbar.Brand>
          Like it? Bookmark it!
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}


export default ETNavbar;
