import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../css/nametag.css';


class Nametag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      upvotes: props.upvotes,
      downvotes: props.downvotes,
      userVoteChoice: props.userVoteChoice,
      createdByUser: props.createdByUser
    }
  }

  render() {
    return (
      <Container>
        <Row className={`mb-3 p-2 border-start fs-8 ${this.state.createdByUser === true ? "border-3" : "border-1"}`}>
          <Col xs={1} className="text-center">
            <Button
              className="cus-btn-xs cus-btn-success-hov"
              variant={this.state.userVoteChoice === true ?
                "success" : "outline-dark"}
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </Button>
            <br />
            <span>{this.state.upvotes - this.state.downvotes}</span>
            <br />
            <Button
              className="cus-btn-xs cus-btn-danger-hov"
              variant={this.state.userVoteChoice === false ?
                "danger" : "outline-dark"}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </Button>
          </Col>
          <Col xs={11} className="align-self-center">
            <p className="mt-3">&nbsp;{this.state.value}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default Nametag;
