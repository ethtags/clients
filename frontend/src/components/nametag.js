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
  const [upvotes, setUpvotes] = useState(props.upvotes);
  const [downvotes, setDownvotes] = useState(props.downvotes);
  const [userVoted, setUserVoted] = useState(props.userVoted);
  const [userVoteChoice, setUserVoteChoice] = useState(props.userVoteChoice);
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
        // TODO refactor this so that it only fetches nametags
        // without refreshing the page
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

  const abbrDate = (isoformattedDate) => {
    var date = new Date(isoformattedDate);
    return date.toLocaleDateString();
  }

  const abbrTime = (isoformattedDate) => {
    var date = new Date(isoformattedDate);
    return date.toLocaleTimeString();
  }

  /*
   * Return a URL that links to the given
   * source and address.
   */
  const getSourceURL = (source, address, ensName) => {
    if (source === "etherscan") {
      return `https://etherscan.io/address/${address}`
    }
    else if (source === "dune") {
      return `https://dune.com/labels/ethereum/${address}`
    }
    else if (source === "ethleaderboard") {
      return `https://ethleaderboard.xyz/?q=${ensName}`
    }
    else if (source === "opensea") {
      return `https://opensea.io/${address}`
    }
    else {
      throw new Error(`Unexpected source returned by backend, don't know how to handle source: ${source}`);
    }
  }


  return (
    <Container id={props.id}>
      <Row className={`mb-3 p-2 border-start ${props.createdByUser === true ? "border-3" : "border-1"}`}>
        <Col xs={3} sm={2} lg={1} className="text-center">
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
        <Col xs={9} sm={7} lg={9} className="align-self-center">
          <p className="mt-3 fs-6 mb-0">
            {props.value}
          </p>
          {props.source ? <p className="mt-0 mb-0 fs-7"><a href={getSourceURL(props.source, props.address, props.ensName)} target="_blank" rel="noreferrer">More on {props.source.toUpperCase()}</a></p> : ""}
        </Col>
        <Col xs={12} sm={2} lg={1} className="align-self-center">
          <p className="mt-3 mb-0 fs-7">
            {abbrDate(props.created)} <br/> {abbrTime(props.created)}
          </p>
        </Col>
      </Row>
    </Container>
  )
}


export default Nametag;
