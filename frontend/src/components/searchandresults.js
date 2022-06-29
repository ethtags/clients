import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Results from './results';
import SearchBar from './searchbar';
import SuggestBar from './suggestbar';


class SearchAndResults extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";

    this.state = {
      address: null,
      nametags: [],
      suggestBarState: {
        error: null,
        loading: false
      },
    }

    // bind functions
    this.setAddress = this.setAddress.bind(this);
    this.closeSuggestToast = this.closeSuggestToast.bind(this);
    this.lookupAddress = this.lookupAddress.bind(this);
    this.submitNametag = this.submitNametag.bind(this);
  }

  setAddress(address) {
    this.setState({
      address: address
    });
    this.lookupAddress(address);
  }

  closeSuggestToast() {
    this.setState({
      suggestBarState: {
        loading: false,
        error: null
      }
    });
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
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        // success state
        this.setState({
          nametags: res
        });
      })
      // log errors
      .catch(error => {
        console.error(error);
      });
  }

  submitNametagRequest(nametagVal, recaptchaVal) {
    // prepare request
    var url = this.baseUrl + this.state.address + "/tags/";
    const data = {"nametag": nametagVal, "recaptcha": recaptchaVal};
    
    // submit request
    fetch(url, {
      method: 'POST',
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
          this.setState({
            suggestBarState: {
              loading: false,
              error: res.message 
            }
          });
          return null
        }

        // response was successful
        // update state
        this.setState({
          suggestBarState: {
            loading: false,
            error: null
          }
        });
        // refresh nametags
        this.lookupAddress(this.state.address);
      })
      // show and log errors
      .catch(error => {
        console.error(error);
        this.setState({
          suggestBarState: {
            loading: false,
            error: error.message
          }
        });
      });
  }

  submitNametag(value) {
    // set state to loading
    this.setState({
      suggestBarState: {
        loading: true,
        error: null
      }
    });

    // complete captcha challenge
    window.grecaptcha.execute(
      process.env.REACT_APP_RECAPTCHA_SITE_KEY,
      {action: 'nametag'}
    )
    .then(token => {
      // do request
      this.submitNametagRequest(value, token);
    });
  }


  render() {

    return (
      <Container className="p-5 mb-2 mt-2 bg-light rounded-3">

        {/*search*/}
        <Container className="p-3">
          <SearchBar onSubmit={this.setAddress}></SearchBar>
        </Container>

        {/*results*/}
        <Container className="mt-4">
          <Results
            nametags={this.state.nametags} 
            address={this.state.address} 
          />
        </Container>

        {/*suggest*/}
        <Container className="mt-4">
          <Row className="justify-content-md-center">
            <Col xs={12} lg={6}>
              <SuggestBar
                address={this.state.address}
                error={this.state.suggestBarState.error}
                loading={this.state.suggestBarState.loading}
                onSubmit={this.submitNametag}
                onToastClose={this.closeSuggestToast}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}


export default SearchAndResults;
