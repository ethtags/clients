import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Address from './address';
import SuggestBar from './suggestbar';
import Nametag from './nametag';
import '../css/results.css';
import mockResults from './mockresults.json';


class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nametags: []
    }
  }

  componentDidMount() {
    this.setState({
      nametags: mockResults
    })
  }

  render() {
    if (this.props.address === null) return null

    else return (
      <Container>
        <Address value={this.props.address} />
        <Container className="vh-45 overflow-y-scroll overflow-x-hidden">
        {this.state.nametags.map(nametag => (
          <Nametag
            key={nametag.id}
            value={nametag.nametag} 
            upvotes={nametag.votes.upvotes}
            downvotes={nametag.votes.downvotes}
            userVoteChoice={nametag.votes.userVoteChoice}
            createdByUser={nametag.createdByUser}
          />
        ))}
        </Container>

        <Container className="mt-4">
          <Row className="justify-content-md-center">
            <Col xs={12} lg={6}>
              <SuggestBar address={this.props.address} />
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}


export default Results;
