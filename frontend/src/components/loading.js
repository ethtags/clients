import React from "react";
import Container from 'react-bootstrap/Container';
import '../css/results.css';


function LoadingWidget(props) {

  return (
    <Container className="p-5 mb-2 mt-2 bg-light rounded-3">
      <p className="header mt-3 fs-4">App is loading, please wait.</p>
    </Container>
  )
}


export default LoadingWidget;
