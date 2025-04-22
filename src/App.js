import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Guide from './Components/Guide';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import RSVP from './Components/RSVP';
import History from './Components/History';

function Root() {
  return <Home />;
}

function Feedback() {
  return <RSVP />;
}

function Us() {
  return <History />;
}

function Travelguide() {
  return <Guide />;
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
