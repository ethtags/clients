import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Address from './address';
import SuggestBar from './suggestbar';
import './results.css';


class Results extends React.Component {
  render() {
    return (
      <Container>
        <Address />
        <Container className="vh-45 overflow-y-scroll overflow-x-hidden">
          <Row className="mb-3 p-2 border-start border-1 fs-8">
            <Col xs={1} className="text-center">
              <Button variant="light" size="sm">
                <FontAwesomeIcon icon={faChevronUp} />
              </Button>
              <br />241<br />
              <Button variant="light" size="sm">
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </Col>
            <Col xs={11} className="align-self-center">
              <p className="mt-3">&nbsp;Address Label</p>
            </Col>
          </Row>

          <Row className="mb-3 p-2 border-start border-1 fs-8">
            <Col xs={1} className="text-center">
              <Button variant="light" size="sm">
                <FontAwesomeIcon icon={faChevronUp} />
              </Button>
              <br />121<br />
              <Button variant="light" size="sm">
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </Col>
            <Col xs={11} className="align-self-center">
              <p className="mt-3">&nbsp;Address Label 2</p>
            </Col>
          </Row>
        
          <Row className="mb-3 p-2 border-start border-1 fs-8">
            <Col xs={1} className="text-center">
              <Button variant="light" size="sm">
                <FontAwesomeIcon icon={faChevronUp} />
              </Button>
              <br />121<br />
              <Button variant="light" size="sm">
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </Col>
            <Col xs={11} className="align-self-center">
              <p className="mt-3">&nbsp;Address Label 2</p>
            </Col>
          </Row>

          <Row className="mb-3 p-2 border-start border-1 fs-8">
            <Col xs={1} className="text-center">
              <Button variant="light" size="sm">
                <FontAwesomeIcon icon={faChevronUp} />
              </Button>
              <br />121<br />
              <Button variant="light" size="sm">
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </Col>
            <Col xs={11} className="align-self-center">
              <p className="mt-3">&nbsp;Address Label 2</p>
            </Col>
          </Row>
        </Container>

        <Container className="mt-4">
          <Row className="justify-content-md-center">
            <Col xs={12} lg={6}>
              <SuggestBar />
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}


export default Results;
