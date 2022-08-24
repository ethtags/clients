import React, { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import '../css/staleresults.css';


function StaleResultsToast(props) {
  const [show, setShow] = useState(true);
  
  /*
   * Make the toast visible again after
   * new address is searched.
   */
  useEffect(() => {
    if (props.isStale === null) setShow(false);
    else setShow(true);
  }, [props.isStale])


  return (
    <ToastContainer className="p-3" position="bottom-end">
    <Toast
      onClose={() => setShow(false)}
      show={show}
      autohide={props.isStale ? false : true}
      delay={props.isStale ? "" : "8000"}
    >
      <Toast.Header>
        <Spinner 
          animation={props.isStale ? "border" : "grow"}
          variant={props.isStale ? "warning" : "success"}
          className={props.isStale ? "" : "spinner-slow"}
          size="sm"
        />&nbsp;
        <span className="me-auto">
          {props.isStale ? 
            "Searching for new data." :
            "Showing the latest results!"}
        </span>
       </Toast.Header>
    </Toast>
    </ToastContainer>
  )
}


export default StaleResultsToast;
