import homeimage from '../image/intro-foto.jpg';
import Contact from './Contact';
import Location from './Location';
import Timeline from './Timeline';

function Home() {
  return (
    <div className="">
      <img src={homeimage} alt="Dani & Michel" />
      <Location />
      <Timeline />
      <Contact />
    </div>
  );
}

export default Home;
