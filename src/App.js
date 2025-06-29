import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import Guide from './pages/Guide'
import Home from './pages/Home'
import NavBar from './Components/NavBar'
import History from './pages/History'
import { useEffect } from 'react'
import menuImage from './image/background_mobile_menu.webp'
import Footer from './Components/Footer'
import Analysis from './pages/Analysis'

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100) // 100ms Delay
    }
  }, [location])

  return null
}

function App() {
  return (
    <div className="bg-primary text-neutral min-h-screen flex flex-col">
      <Router>
        {/* Bild unsichtbar laden */}
        <img src={menuImage} alt="" style={{ display: 'none' }} />

        <NavBar />
        <ScrollToHash />
        <main className="flex-grow">
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/ourhistory" element={<History />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
