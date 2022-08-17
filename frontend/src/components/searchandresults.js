import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Results from './results';
import SearchBar from './searchbar';
import SuggestBar from './suggestbar';
import { addrStatuses, ethProvider } from './utils';


function SearchAndResults(props) {
  // constants
  let { addressUrl } = useParams();
  let routerLocation = useLocation();
  let navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";

  // state
  const [address, setAddress] = useState("");
  const [addrStatus, setAddrStatus] = useState(addrStatuses.IDLE);
  const [loadingTags, setLoadingTags] = useState(false);
  const [ensName, setEnsName] = useState("");
  const [nametags, setNametags] = useState([]);
  const [sourcesAreStale, setSourcesAreStale] = useState(false);
  const [suggestBarError, setSuggestBarError] = useState(null);
  const [suggestBarLoading, setSuggestBarLoading] = useState(false);

  // effects
  /*
   * Fetch the nametags for the given address.
   * Parse the address from the URL.
   * If the address is an ENS name, resolve it to an address.
   */
  useEffect(() => {
    const controller = new AbortController();

    /*
     * Async function that resolves an address or ens name.
     */
    const resolveAddress = async (address) => {
      // normalize address
      address = address.toLowerCase();

      // not an ens
      if (!address.endsWith(".eth")) {
        // address is valid
        try {
          setEnsName("");
          setAddrStatus(addrStatuses.FETCHING_ADDRESS);
          var resolved = ethers.utils.getAddress(address.toLowerCase());
          setAddress(resolved);
          setAddrStatus(addrStatuses.ADDRESS_FOUND);
          return resolved;
        }
        // address is invalid
        catch (error) {
          setAddress(address);
          setAddrStatus(addrStatuses.INVALID_ADDRESS);
          throw new Error(error);
        }
      }

      // resolve ens address
      else {
        // valid ens
        try {
          setAddress(address);
          setAddrStatus(addrStatuses.FETCHING_ENS);
          resolved = await ethProvider.resolveName(address);

          // ens name doesn't map to anything
          if (resolved === null) {
            throw new Error(`${address} does not resolve to an address.`);
          }
          // ens name found
          else {
            setAddress(resolved);
            setAddrStatus(addrStatuses.ENS_FOUND);
            setEnsName(address);
            return resolved;
          }
        }
        // invalid ens
        catch (error) {
          setAddress(address);
          setAddrStatus(addrStatuses.INVALID_ENS);
          throw new Error(error);
        }
      }
    }

    /*
     * Async function that GETs nametags from backend.
     */
    const fetchNametags = async () => {
      // return if address in url is empty
      if (addressUrl === undefined) return

      // resolve the address given in the url
      var resolved = await resolveAddress(addressUrl);

      // prepare request
      var url = baseUrl + resolved + "/";
    
      // submit request
      setLoadingTags(true);
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        signal: controller.signal,
      });
      setLoadingTags(false);

      // TODO handle unexpected status codes
      if (resp.status !== 200 && resp.status !== 404) {
        console.error("handle error feedback");
      }
      
      // handle 200 and 404
      const result = await resp.json();
      if (result.nametags === undefined) {
        result.nametags = [];
      }
      setNametags(result.nametags);

      // handle stale sources
      setSourcesAreStale(result.sourcesAreStale);
    }

    // get address if an ens name is given
    fetchNametags();

    // cleanup function on unmount
    return () => {
      // abort any pending fetch request
      controller.abort();
      setLoadingTags(false);
    }
  },
  [baseUrl, addressUrl, routerLocation.key]
  );


  /* Look up an ENS name when a valid address is given. */
  useEffect(() => {
    (async () => {
      // return if address hasn't been resolved yet
      if (addrStatus !== addrStatuses.ADDRESS_FOUND) return

      // return if ens name has already been looked up
      if (ensName !== "" &&
          ensName !== "Loading ENS...") return

      // set ENS name to loading
      setEnsName("Loading ENS...");

      // find an ens given an address
      var result = await ethProvider.lookupAddress(address);
      setEnsName(result);
    })()
  }, [address, addrStatus, ensName]);


  /*
   * Set a timer to auto-refrsh the page if sources are stale.
   * The timer should clear when the component unmounts.
   */
  useEffect(() => {
    // do nothing if sources are not stale
    if (sourcesAreStale === false) return

    // refresh the page after X seconds if sources are stale
    const timeoutId = setTimeout(() => {
      alert("refreshing page to see job results");
      navigate(`/address/${address}`);
    }, 10000);

    // cleanup function on unmount
    return () => {
      // TODO fix bug with reloading twice even though sources are not stale
      // clear setTimeout that may have been set
      clearTimeout(timeoutId);
    }
  }, [address, navigate, sourcesAreStale])


  // functions
  const closeSuggestToast = () => {
    // set suggest bar state
    setSuggestBarError(null);
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
            navigate(`/address/${address}`);
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
      // show errors
      .catch(error => {
        setSuggestBarLoading(false);
        setSuggestBarError(error.message);
        throw new Error(error);
      });
  }


  return (
    <Container className="p-5 mb-2 mt-2 bg-light rounded-3">

      {/*search*/}
      <Container className="p-3">
        <SearchBar />
      </Container>

      {/*results*/}
      <Container className="mt-4">
        <Results
          nametags={nametags} 
          address={address} 
          ensName={ensName}
          addrStatus={addrStatus}
          loadingTags={loadingTags}
        />
      </Container>

      {/*suggest*/}
      { (
          addrStatus === addrStatuses.ADDRESS_FOUND ||
          addrStatus === addrStatuses.ENS_FOUND
        ) && 
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
      }

    </Container>
  )
}

export default SearchAndResults; 
