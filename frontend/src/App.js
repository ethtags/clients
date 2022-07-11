import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ETNavbar from './components/navbar';
import SearchAndResults from './components/searchandresults';
import './App.css';


const App = () => (
  <BrowserRouter>
    <Container>

      {/* Navbar always displays */}
      <ETNavbar />

      {/* Routes and their elements */}
      <Routes>
        <Route
          path="/"
          element={<SearchAndResults />}
        />
        <Route
          path="/address/:addressUrl"
          element={<SearchAndResults />}
        />
        <Route
          path="*"
          element={<div>Not Found.</div>}
        />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;
