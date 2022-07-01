import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../css/nametag.css';


function Nametag(props) {
  // state
  const [value] = useState(props.value);
  const [upvotes, setUpvotes] = useState(props.upvotes);
  const [downvotes, setDownvotes] = useState(props.downvotes);
  const [userVoted, setUserVoted] = useState(props.userVoted);
  const [userVoteChoice, setUserVoteChoice] = useState(props.userVoteChoice);
  const [createdByUser] = useState(props.createdByUser);
  const [loading, setLoading] = useState(false);

  // constants
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";
  const navigate = useNavigate();

  // functions
  const doUpvote = () => {
    // user is undoing their upvote
    if (userVoteChoice === true) {
      submitVote(null, true);
      return
    }

    // post a new vote if user hasnt voted before
    if (userVoted === false) submitVote(true, false);

    // update vote if user has voted before
    else submitVote(true, true);
  }

  const doDownvote = () => {
    // user is undoing their downvote
    if (userVoteChoice === false) {
      // update vote to no vote
      submitVote(null, true);
      return
    }

    // post a new vote if user hasnt voted before
    if (userVoted === false) submitVote(false, false);

    // update vote if user has voted before
    else submitVote(false, true);
  }

  const submitVote = (value, isUpdate) => {
    // set loading
    setLoading(true);

    // prepare request
    var url = `${baseUrl + props.address}/tags/${props.id}/votes/`;
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
          // set loading false
          setLoading(false);

          // log error
          console.error(res.message);
          return null
        }

        // response was successful
        // update state
        setUpvotes(res.upvotes);
        setDownvotes(res.downvotes);
        setUserVoteChoice(res.userVoteChoice);
        setUserVoted(res.userVoted);
        setLoading(false);

        // refresh page to show most recent results
        navigate(`/address/${props.address}`);
      })
      // show and log errors
      .catch(error => {
        // set loading false
        setLoading(false);

        // log error
        console.error(error);
      });
  }


  return (
    <Container>
      <Row className={`mb-3 p-2 border-start fs-8 ${createdByUser === true ? "border-3" : "border-1"}`}>
        <Col xs={1} className="text-center">
          <Button
            className="cus-btn-xs cus-btn-success-hov"
            variant={userVoteChoice === true ?
              "success" : "outline-dark"}
            onClick={doUpvote}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </Button>
          <br />
          <span>{upvotes - downvotes}</span>
          <br />
          <Button
            className="cus-btn-xs cus-btn-danger-hov"
            variant={userVoteChoice === false ?
              "danger" : "outline-dark"}
            onClick={doDownvote}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </Col>
        <Col xs={11} className="align-self-center">
          <p className="mt-3">&nbsp;{value}</p>
        </Col>
      </Row>
    </Container>
  )
}


export default Nametag;
