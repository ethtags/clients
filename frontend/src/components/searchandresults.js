import React from "react";
import Container from 'react-bootstrap/Container';
import Results from './results';
import SearchBar from './searchbar';


class SearchAndResults extends React.Component {
  constructor(props) {
    super(props);
    this.setAddress = this.setAddress.bind(this);
    this.state = {
      address: null,
    }
  }

  setAddress(address) {
    this.setState({
      address: address
    });
  }

  render() {
    const address = this.state.address;

    return (
      <Container className="p-5 mb-2 mt-2 bg-light rounded-3">
        <Container className="p-3">
          <SearchBar onSearch={this.setAddress}></SearchBar>
          <h2 className="header mt-5">ETHTags powers your blockchain search experience.</h2>
          <p className="header mt-3 fs-4">Nametags will appear here. Vote or suggest your own.</p>
        </Container>
        <Container className="mt-4">
          <Results address={address} />
        </Container>
      </Container>
    )
  }
}


export default SearchAndResults;
