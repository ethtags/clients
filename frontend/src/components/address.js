import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import './address.css';


class Address extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p className="header fs-4 fw-bold overflow-wrap-anywhere">
              0xdf05Bc8769AF8D667564C175EBa248e131c97c4F
              <Button variant="light" className="ms-3">
                <FontAwesomeIcon icon={faCopy} />
              </Button>
              <Button variant="light" className="ms-1">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Button>
            </p>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default Address;
