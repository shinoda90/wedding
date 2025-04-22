import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Guide from './pages/Guide';
import Home from './pages/Home';
import NavBar from './Components/NavBar';
import RSVP from './pages/RSVP';
import History from './pages/History';

function Feedback() {
  return <RSVP />;
}

function Us() {
  return <History />;
}

function Travelguide() {
  return <Guide />;
}

function Root() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return <Home />;
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/guide" element={<Travelguide />} />
        <Route path="/ourhistory" element={<Us />} />
        <Route path="/rsvp" element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;
