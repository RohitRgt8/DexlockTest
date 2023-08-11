import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import People from './components/People/People';
import Vehicle from './components/Vehicle/Vehicle';
import Spaceships from './components/Spaceship/Spaceships';
import Planet from './components/Planet/Planet';
import video from "./components/assets/video.mp4"

function App() {
  return (
    <Router>
      {/* <video className="background-video" autoPlay muted loop>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/people' element={<People />} />
        <Route path='/planets' element={<Planet />} />
        <Route path='/spaceships' element={<Spaceships/>} />
        <Route path='/vehicle' element={<Vehicle/>} />
      </Routes>
    </Router>
  );
}

export default App;
