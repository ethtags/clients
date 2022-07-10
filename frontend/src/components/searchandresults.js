import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Results from './results';
import SearchBar from './searchbar';
import SuggestBar from './suggestbar';


function SearchAndResults(props) {
  // state
  const [address, setAddress] = useState("");
  const [nametags, setNametags] = useState([]);
  const [suggestBarError, setSuggestBarError] = useState(null);
  const [suggestBarLoading, setSuggestBarLoading] = useState(false);

  // constants
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";
  let { addressUrl } = useParams();
  let navigate = useNavigate();
  let routerLocation = useLocation();

  // effects
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ETHERS_PROVIDER || "http://localhost:8545"
    );

    const resolveAddress = async (address) => {
      // not an ens, return address
      if (!address.endsWith(".eth")) return address;

      // get the address that the ens maps to
      var result = await provider.resolveName(address);
      return result;
    }

    const fetchNametags = async () => {
      var resolved = await resolveAddress(addressUrl);
      setAddress(resolved);

      // prepare request
      var url = baseUrl + resolved + "/tags/";
    
      // submit request
      try { 
        const resp = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
        try {
          const result = await resp.json();
          setNametags(result);
        }
        catch (error) {
          console.error(error);
        }
      }
      catch (error) {
        console.error(error);
      }
    }

    // get address if an ens name is given
    fetchNametags();
  },
  [baseUrl, addressUrl, routerLocation.key]
  );

  // functions
  const closeSuggestToast = () => {
    // set suggest bar state
    setSuggestBarError(null);
  }

  const navigateNewAddress = (address) => {
    navigate(`/address/${address}`);
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
        // response was successful
        if (res.ok === true)
          return res.json().then(data => {
            // update state
            setSuggestBarLoading(false);
            setSuggestBarError(null);

            // refresh the results list by reloading the page
            navigateNewAddress(address);
          });

        // response was 400 bad request, show reason
        else if (res.status === 400)
          return res.json().then(data => {
            var errors = "";
            for (const value of Object.values(data)) {
              errors += value + "\n";
            }
            setSuggestBarLoading(false);
            setSuggestBarError(errors);
          });

        // response was unsuccessful for another status code
        else {
          setSuggestBarLoading(false);
          setSuggestBarError(`${res.status} ${res.statusText}`);
        }
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
        <SearchBar onSubmit={navigateNewAddress}></SearchBar>
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
