import Container from 'react-bootstrap/Container';
import ETNavbar from './components/navbar';
import SearchAndResults from './components/searchandresults';

import './App.css';


const App = () => (
  <Container>
    <ETNavbar />
    <SearchAndResults />
  </Container>
);

export default App;
