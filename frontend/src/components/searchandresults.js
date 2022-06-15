import React from "react";
import Container from 'react-bootstrap/Container';
import Results from './results';
import SearchBar from './searchbar';


class SearchAndResults extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";

    this.state = {
      address: null,
      nametags: []
    }

    // bind functions
    this.setAddress = this.setAddress.bind(this);
    this.lookupAddress = this.lookupAddress.bind(this);
  }

  setAddress(address) {
    this.setState({
      address: address
    });
    this.lookupAddress(address);
  }

  lookupAddress(address) {
    // prepare request
    var url = this.baseUrl + address + "/tags/";
    
    // submit request
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // success state
        this.setState({
          loading: false,
          nametags: res
        });
      })
      // show and log errors
      .catch(
        (error) => {
          console.error(error);
          this.setState({
            loading: false,
            error: error.message
          });
        }
      );
  }

  render() {

    return (
      <Container className="p-5 mb-2 mt-2 bg-light rounded-3">
        <Container className="p-3">
          <SearchBar onSearch={this.setAddress}></SearchBar>
        </Container>
        <Container className="mt-4">
          <Results
            nametags={this.state.nametags} 
            address={this.state.address} 
          />
        </Container>
      </Container>
    )
  }
}


export default SearchAndResults;
