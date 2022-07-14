import { Suspense, lazy } from 'react';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ETNavbar from './components/navbar';
import './App.css';

const Home = lazy(() => import('./pages/home'));
const SearchAndResults = lazy(() => import('./components/searchandresults'));

const App = () => (
  <BrowserRouter>
    <Container>

      {/* Navbar always displays */}
      <ETNavbar />

      {/* Routes and their elements */}
      <Suspense fallback={<></>}>
      <Routes>
        <Route
          path="/"
          element={<Home />}
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
      </Suspense>
    </Container>
  </BrowserRouter>
);

export default App;
