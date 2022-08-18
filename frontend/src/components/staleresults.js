import React, { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import '../css/staleresults.css';


function StaleResultsToast(props) {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer className="p-3" position="bottom-end">
    <Toast
      onClose={() => setShow(false)}
      show={show}
      autohide={props.isStale ? false : true}
      delay={props.isStale ? "" : "8000"}
    >
      <Toast.Header>
        <span className="me-auto">
          {props.isStale ? "Sources are stale." : "Sources are fresh!"}
        </span>
      </Toast.Header>
      <Toast.Body>
        <Spinner 
          animation={props.isStale ? "border" : "grow"}
          variant={props.isStale ? "warning" : "success"}
          className={props.isStale ? "" : "spinner-slow"}
          size="sm"
        />&nbsp;
        {props.isStale ? "We are checking our sources for new data!" : "We checked our sources less than X hours ago!"}
       </Toast.Body>
    </Toast>
    </ToastContainer>
  )
}


export default StaleResultsToast;
