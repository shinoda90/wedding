import homeimage from '../image/intro-foto.jpg';
import Contact from '../Components/Contact';
import Location from '../Components/Location';
import Timeline from '../Components/Timeline';

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
