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
      userVoted: props.userVoted,
      userVoteChoice: props.userVoteChoice,
      createdByUser: props.createdByUser
    }
    this.baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";

    // bind functions
    this.doUpvote = this.doUpvote.bind(this);
    this.doDownvote = this.doDownvote.bind(this);
  }

  doUpvote() {
    // user is undoing their upvote
    if (this.state.userVoteChoice === true) {
      this.submitVote(null, true);
      return
    }

    // post a new vote if user hasnt voted before
    if (this.state.userVoted === false)
      this.submitVote(true, false);

    // update vote if user has voted before
    else this.submitVote(true, true);
  }

  doDownvote() {
    // user is undoing their downvote
    if (this.state.userVoteChoice === false) {
      // update vote to no vote
      this.submitVote(null, true);
      return
    }

    // post a new vote if user hasnt voted before
    if (this.state.userVoted === false)
      this.submitVote(false, false);

    // update vote if user has voted before
    else this.submitVote(false, true);
  }

  submitVote(value, isUpdate) {
    // prepare request
    var url = `${this.baseUrl + this.props.address}/tags/${this.props.id}/votes/`;
    const data = {"value": value};

    // submit request
    fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok === true) return res.json();
        else return Error(res.statusText);
      })
      .then(res => {
        if (res instanceof Error) {
          console.error(res.message);
          return null
        }

        // response was successful
        // update state
        this.setState({
          upvotes: res.upvotes,
          downvotes: res.downvotes,
          userVoteChoice: res.userVoteChoice,
          userVoted: res.userVoted
        });
      })
      // show and log errors
      .catch(error => {
        console.error(error);
      });
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
              onClick={this.doUpvote}
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
              onClick={this.doDownvote}
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
