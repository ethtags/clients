import React from "react";
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


class Address extends React.Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      showCopyTooltip: false
    }

    // refs
    this.copyBtnRef = React.createRef();

    // bind functions
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipboard() {
    // do copy
    navigator.clipboard.writeText(this.props.value);

    // show success tooltip then hide it
    this.setState({showCopyTooltip: true});
    setTimeout(
      () => this.setState({showCopyTooltip: false}),
      1000
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p className="header fs-4 fw-bold overflow-wrap-anywhere">
              {this.props.value}

              {/* Copy button and tooltip */}
              <Button
                variant="light"
                className="ms-3"
                ref={this.copyBtnRef}
                onClick={this.copyToClipboard}>
                <FontAwesomeIcon icon={faCopy} />
              </Button>
              <Overlay target={this.copyBtnRef.current} show={this.state.showCopyTooltip} placement="top">
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
                onClick={() => {window.open(`https://etherscan.io/address/${this.props.value}`)}}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Button>
            </p>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default Address;
