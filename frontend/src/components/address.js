import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Overlay from 'react-bootstrap/Overlay';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import '../css/address.css';


function Address(props) {
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const copyBtnRef = React.createRef();

  const copyToClipboard = () => {
    // do copy
    navigator.clipboard.writeText(props.value);

    // show success tooltip then hide it
    setShowCopyTooltip(true);
    setTimeout(
      () => setShowCopyTooltip(false),
      1000
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <p className="header fs-5 fw-bold overflow-wrap-anywhere">
            {props.ensName ? props.ensName + " | " : ""}{props.value}

            {/* Copy button and tooltip */}
            <Button
              variant="light"
              className="ms-3"
              ref={copyBtnRef}
              onClick={copyToClipboard}>
              <FontAwesomeIcon icon={faCopy} />
            </Button>
            <Overlay target={copyBtnRef.current} show={showCopyTooltip} placement="top">
              {(props) => (
                <Tooltip {...props}>
                  Copied!
                </Tooltip>
              )}
            </Overlay>

            {/* Open in etherscan button */}
            <Button
              variant="light"
              className="ms-1"
              onClick={() => {window.open(`https://etherscan.io/address/${props.value}`)}}>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Button>
          </p>
        </Col>
      </Row>
    </Container>
  )
}


export default Address;
