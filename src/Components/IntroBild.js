import homeimage from '../image/intro-foto.webp';
import homeimage2 from '../image/background_mobile_menu.webp';
import Countdown from './Countdown';
import { useEffect } from 'react';

export default function IntroBild({ onLoad }) {
  useEffect(() => {
    const img = document.getElementById('hero-img'); // oder passendes img
    if (img && !img.complete) {
      img.onload = () => onLoad?.();
    } else {
      onLoad?.();
    }
  }, [onLoad]);

  return (
    <div className="relative h-screen w-full">
      <img
        src={homeimage2}
        onLoad={() => {
          setTimeout(onLoad, 100); // Verzögertes "Fertig"-Signal
        }}
        alt="Dani & Michel"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Countdown zentriert unten */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white p-4 rounded-lg z-10">
        <div className="flex justify-center items-center gap-4">
          <Countdown />
        </div>
      </div>

      {/* Textfeld zentriert im Bild */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-6 rounded-lg text-center z-10">
        <h1 className="text-8xl font-bold fancy-text">Daniela & Michel</h1>
        <div className="text-2xl mt-8">27. December 2025 - 16:00 Uhr</div>
        <div className="text-xl mt-8">Cardedeu, Lago Coatepeque, El Salvador</div>
      </div>
    </div>
  );
}
