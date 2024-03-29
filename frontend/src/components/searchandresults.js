import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Results from './results';
import SearchBar from './searchbar';
import SuggestBar from './suggestbar';
import { getAddress } from '../requests';
import { addrStatuses, ethProvider } from './utils';


function SearchAndResults(props) {
  // constants
  let { urlInput } = useParams();
  let routerLocation = useLocation();
  let navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";

  // state
  const [address, setAddress] = useState("");
  const [addrStatus, setAddrStatus] = useState(addrStatuses.IDLE);
  const [loadingTags, setLoadingTags] = useState(false);
  const [ensName, setEnsName] = useState(null);
  const [nametags, setNametags] = useState([]);
  const [sourcesAreStale, setSourcesAreStale] = useState(null);
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
     * Async function that resolves an address or ens name to an address.
     */
    const resolveAddress = async (urlInput) => {
      // normalize address
      urlInput = urlInput.toLowerCase();

      // not an ens
      if (!urlInput.endsWith(".eth")) {
        // address is valid
        try {
          setAddrStatus(addrStatuses.FETCHING_ADDRESS);
          var resolved = ethers.utils.getAddress(urlInput.toLowerCase());
          setAddress(resolved);
          setAddrStatus(addrStatuses.ADDRESS_FOUND);
          return resolved;
        }
        // address is invalid
        catch (error) {
          setAddress(urlInput);
          setAddrStatus(addrStatuses.INVALID_ADDRESS);
          throw new Error(error);
        }
      }

      // resolve ens address
      else {
        // valid ens
        try {
          setAddrStatus(addrStatuses.FETCHING_ENS);
          resolved = await ethProvider.resolveName(urlInput);

          // ens name doesn't map to anything
          if (resolved === null) {
            throw new Error(`${urlInput} does not resolve to an address.`);
          }
          // found address the ens name resolves to
          else {
            setAddress(resolved);
            setAddrStatus(addrStatuses.ENS_FOUND);
            setEnsName(urlInput);
            return resolved;
          }
        }
        // invalid ens
        catch (error) {
          setAddress(urlInput);
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
      if (urlInput === undefined) return

      // resolve the address given in the url
      var resolved = await resolveAddress(urlInput);

      // fetch address data including nametags
      setLoadingTags(true);
      const resp = await getAddress(resolved, controller);
      setLoadingTags(false);

      // TODO handle unexpected status codes
      if (resp.status !== 200 && resp.status !== 404) {
        console.error("TODO: handle error feedback");
      }
      
      // handle 200 and 404
      const result = await resp.json();
      if (result.nametags === undefined) {
        result.nametags = [];
      }
      setNametags(result.nametags);
      setSourcesAreStale(result.sourcesAreStale);
    }

    // clear nametags so screen does not glitch
    setNametags([]);
    setAddrStatus(addrStatuses.IDLE);

    // search for the given address
    fetchNametags();

    // cleanup function on unmount
    return () => {
      // abort any pending requests
      controller.abort();
      setLoadingTags(false);
    }
  },
  [urlInput, routerLocation.key]
  );


  /* Look up an ENS name when a valid address is given. */
  useEffect(() => {
    (async () => {
      // return if address hasn't been resolved yet
      if (addrStatus !== addrStatuses.ADDRESS_FOUND) return

      // set ENS name to loading
      setEnsName("Loading");

      // find an ens given an address
      var result = await ethProvider.lookupAddress(address);
      setEnsName(result);
      setAddrStatus(addrStatuses.ENS_FOUND);
    })()
  }, [address, addrStatus]);


  /*
   * Poll for fresh results if current sources are stale.
   */
  useEffect(() => {
    // do nothing if sources are not stale
    if (sourcesAreStale === false) return

    /*
     * GET address data from the backend.
     * This is called continuously by an interval function
     * until fresh sources are found, at which point the
     * interval is cleared, sources are marked as fresh,
     * and nametags are refreshed if there are new ones.
     */
    const controller = new AbortController();
    const fetchNametags = async (intervalId) => {
      const resp = await getAddress(address, controller);
      const data = await resp.json(); 
      if (data.sourcesAreStale === false) {
        setSourcesAreStale(false);
        clearInterval(intervalId);
        
        if (nametags.length !== data.nametags.length) {
          setNametags(data.nametags);
        }
      }
    }

    /*
     * Interval function that polls for new address data.
     * Polls every 10 seconds.
     */
    const intervalId = setInterval(() => {
      fetchNametags(this);
    }, 10000);

    // cleanup function on unmount
    return () => {
      // clear interval function and pending requests
      clearInterval(intervalId);
      controller.abort();
    }
  }, [sourcesAreStale, address, nametags])


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
          sourcesAreStale={sourcesAreStale}
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
