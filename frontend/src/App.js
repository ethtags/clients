import React from 'react';
import Container from 'react-bootstrap/Container';
import ETNavbar from './components/navbar';
import SearchAndResults from './components/searchandresults';

import './App.css';


class App extends React.Component {
  componentDidMount() {
    // inject recaptcha
    const script = document.createElement("script");

    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
  }

  render () {
    return (
      <Container>
        <ETNavbar />
        <SearchAndResults />
      </Container>
    )
  }
}

export default App;
