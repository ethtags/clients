import React from "react";
import Container from 'react-bootstrap/Container';
import SearchBar from '../components/searchbar';
import '../css/results.css';


function Home(props) {

  return (
    <Container className="p-5 mb-2 mt-2 bg-light rounded-3">
      {/* Search Bar */}
      <Container className="p-3">
        <SearchBar />
      </Container>

      {/* Instructions */}
      <Container className="mt-4">
        <p className="header mt-3 fs-4">Nametags will appear here.</p>
        <p className="header mt-3 fs-4">Vote or submit your own.</p>
      </Container>
    </Container>
  )
}


export default Home;
