import Container from 'react-bootstrap/Container';
import ETNavbar from './components/navbar';
import Results from './components/results';
import SearchBar from './components/searchbar';

import './App.css';


const App = () => (
  <Container>
    <ETNavbar></ETNavbar>
    <Container className="p-5 mb-2 mt-2 bg-light rounded-3">
      <Container className="p-3">
        <SearchBar></SearchBar>
        <h2 className="header mt-5">ETHTags powers your blockchain search experience.</h2>
        <p className="header mt-3 fs-4">Nametags will appear here. Vote or suggest your own.</p>
      </Container>
      <Container className="mt-4">
        <Results />
      </Container>
    </Container>
  </Container>
);

export default App;
