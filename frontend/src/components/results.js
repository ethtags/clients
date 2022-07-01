import React from "react";
import Container from 'react-bootstrap/Container';
import Address from './address';
import Nametag from './nametag';
import '../css/results.css';


function Results(props) {

  function render() {

    // show instructions if user hasn't searched
    if (
        (props.address === null || props.address === "") &&
        (props.nametags.length === 0)
    ) {
      return (
        <Container>
          <p className="header mt-3 fs-4">Nametags will appear here.</p>
          <p className="header mt-3 fs-4">Vote or suggest your own.</p>
        </Container>
      )
    }

    // show results if user has searched
    else return (
      <Container>
        <Address value={props.address} />
        <Container className="vh-45 overflow-y-scroll overflow-x-hidden">
        {props.nametags.map(nametag => (
          <Nametag
            key={nametag.id}
            id={nametag.id}
            value={nametag.nametag} 
            upvotes={nametag.votes.upvotes}
            downvotes={nametag.votes.downvotes}
            userVoted={nametag.votes.userVoted}
            userVoteChoice={nametag.votes.userVoteChoice}
            createdByUser={nametag.createdByUser}
            address={props.address}
          />
        ))}
        </Container>
      </Container>
    )
  }

  return render();
}


export default Results;
