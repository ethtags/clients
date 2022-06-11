import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Address from './address';
import SuggestBar from './suggestbar';
import Nametag from './nametag';
import '../css/results.css';


class Results extends React.Component {
  render() {
    return (
      <Container>
        <Address value="0xdf05Bc8769AF8D667564C175EBa248e131c97c4F" />
        <Container className="vh-45 overflow-y-scroll overflow-x-hidden">
          <Nametag
            value="Address One" 
            upvotes={250}
            downvotes={9}
            userVoteChoice={null}
            createdByUser={false}
          />

          <Nametag
            value="Address Two" 
            upvotes={240}
            downvotes={9}
            userVoteChoice={true}
            createdByUser={false}
          />

          <Nametag
            value="Address Three" 
            upvotes={230}
            downvotes={9}
            userVoteChoice={false}
            createdByUser={false}
          />

          <Nametag
            value="Address Four" 
            upvotes={220}
            downvotes={9}
            userVoteChoice={true}
            createdByUser={true}
          />
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
