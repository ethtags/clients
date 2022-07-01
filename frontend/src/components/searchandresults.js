import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Results from './results';
import SearchBar from './searchbar';
import SuggestBar from './suggestbar';


function SearchAndResults(props) {
  // state
  const [address, setAddress] = useState(null);
  const [nametags, setNametags] = useState([]);
  const [suggestBarError, setSuggestBarError] = useState(null);
  const [suggestBarLoading, setSuggestBarLoading] = useState(false);

  // constants
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";

  // functions
  const closeSuggestToast = () => {
    // set suggest bar state
    setSuggestBarError(null);
  }

  const lookupAddress = (address) => {
    // set address state
    setAddress(address);

    // prepare request
    var url = baseUrl + address + "/tags/";
    
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
        setNametags(res);
      })
      // log errors
      .catch(error => {
        console.error(error);
      });
  }

  const submitNametag = (value) => {
    // prepare request
    var url = baseUrl + address + "/tags/";
    const data = {"nametag": value};
    
    // set state to loading
    setSuggestBarLoading(true);

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
          setSuggestBarLoading(false);
          setSuggestBarError(res.message);
          return null
        }

        // response was successful
        // update state
        setSuggestBarLoading(false);
        setSuggestBarError(null);

        // refresh nametags
        lookupAddress(address);
      })
      // show and log errors
      .catch(error => {
        console.error(error);
        setSuggestBarLoading(false);
        setSuggestBarError(error.message);
      });
  }


  return (
    <Container className="p-5 mb-2 mt-2 bg-light rounded-3">

      {/*search*/}
      <Container className="p-3">
        <SearchBar onSubmit={lookupAddress}></SearchBar>
      </Container>

      {/*results*/}
      <Container className="mt-4">
        <Results
          nametags={nametags} 
          address={address} 
        />
      </Container>

      {/*suggest*/}
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col xs={12} lg={6}>
            <SuggestBar
              address={address}
              error={suggestBarError}
              loading={suggestBarLoading}
              onSubmit={submitNametag}
              onToastClose={closeSuggestToast}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}


export default SearchAndResults;
