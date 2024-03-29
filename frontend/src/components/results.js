import React from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Address from './address';
import Nametag from './nametag';
import StaleResultsToast from './staleresults';
import { addrStatuses } from './utils';
import '../css/results.css';


function Results(props) {
  // constants
  let { urlInput } = useParams();


  function render() {
    // show instructions if user hasn't searched
    if (props.addrStatus === addrStatuses.IDLE) {
      return (
        <Container>
          <p className="header mt-3 fs-4">Nametags will appear here.</p>
          <p className="header mt-3 fs-4">Vote or submit your own.</p>
        </Container>
      )
    }

    // if given address is loading, show loading
    else if (props.addrStatus === addrStatuses.FETCHING_ADDRESS) {
      return (
        <Container>
          <p className="header mt-3 fs-4">Fetching address...</p>
        </Container>
      )
    }

    // if given address is invalid, show error
    else if (props.addrStatus === addrStatuses.INVALID_ADDRESS) {
      return (
        <Container>
          <p className="header mt-3 fs-4">Address is invalid <br/> {urlInput}</p>
        </Container>
      )
    }

    // if given ens is loading, show loading
    else if (props.addrStatus === addrStatuses.FETCHING_ENS) {
      return (
        <Container>
          <p className="header mt-3 fs-4">Resolving address of {urlInput} ...</p>
        </Container>
      )
    }

    // if given ens is invalid, show error
    else if (props.addrStatus === addrStatuses.INVALID_ENS) {
      return (
        <Container>
          <p className="header mt-3 fs-4">{urlInput} does not resolve to an address.</p>
        </Container>
      )
    }

    // show results
    else if (
      (props.addrStatus === addrStatuses.ADDRESS_FOUND) ||
      (props.addrStatus === addrStatuses.ENS_FOUND) 
    ) {
      return (
        <Container>
          <Address
            value={props.address}
            ensName={props.ensName}
          />
          <StaleResultsToast
             isStale={props.sourcesAreStale}
          />
          <Container className="vh-45 overflow-y-scroll overflow-x-hidden">
            {props.nametags.map(nametag => (
              <Nametag
                key={nametag.id}
                id={nametag.id}
                value={nametag.nametag} 
                created={nametag.created}
                upvotes={nametag.votes.upvotes}
                downvotes={nametag.votes.downvotes}
                userVoted={nametag.votes.userVoted}
                userVoteChoice={nametag.votes.userVoteChoice}
                createdByUser={nametag.createdByUser}
                source={nametag.source}
                address={props.address}
                ensName={props.ensName}
              />
            ))}

            {/* if no nametags exist yet, show feedback */}
            {
              (props.loadingTags === false &&
              props.nametags.length) === 0 ? 
                <>
                  <p className="header mt-3 fs-4">No nametags yet, feel free to suggest one below!</p>
                  <p className="header mt-5 fs-6">...and don't be weird...</p>
                  <p className="header mt-3 fs-7">or else.</p>
                  <p className="header mt-0 fs-7">(ง'̀-'́)ง</p>
                </>
              : 
                <></>
            }

          </Container>
        </Container>
      )
    }

    // 
    else {
      return (
        <p className="header mt-3 fs-4">Why are we in this state? Please report to team on discord or telegram.</p>
      )
    }
  }

  return render();
}


export default Results;
