import React from "react";
import Container from 'react-bootstrap/Container';
import Address from './address';
import Nametag from './nametag';
import '../css/results.css';


class Results extends React.Component {

  render() {

    // show instructions if user hasn't searched
    if (
        (this.props.address === null || this.props.address === "") &&
        (this.props.nametags.length === 0)
    ) {
      return (
        <Container>
          <h2 className="header mt-5">ETHTags powers your blockchain search experience.</h2>
          <p className="header mt-3 fs-4">Nametags will appear here. Vote or suggest your own.</p>
        </Container>
      )
    }

    // show results if user has searched
    else return (
      <Container>
        <Address value={this.props.address} />
        <Container className="vh-45 overflow-y-scroll overflow-x-hidden">
        {this.props.nametags.map(nametag => (
          <Nametag
            key={nametag.id}
            id={nametag.id}
            value={nametag.nametag} 
            upvotes={nametag.votes.upvotes}
            downvotes={nametag.votes.downvotes}
            userVoted={nametag.votes.userVoted}
            userVoteChoice={nametag.votes.userVoteChoice}
            createdByUser={nametag.createdByUser}
            address={this.props.address}
          />
        ))}
        </Container>
      </Container>
    )
  }
}


export default Results;
