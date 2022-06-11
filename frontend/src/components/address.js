import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import '../css/address.css';


class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p className="header fs-4 fw-bold overflow-wrap-anywhere">
              {this.state.value}
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
