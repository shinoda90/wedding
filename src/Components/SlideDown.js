import Contact from './Contact';
import { useEffect, useState } from 'react';

export default function SlideDown({ isContactOpen, setIsContactOpen }) {
  const [showContent, setShowContent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    if (isContactOpen) {
      setShowContent(true);
      document.body.style.overflow = 'hidden'; // Verhindert das Scrollen der Seite, wenn das SlideDown geöffnet ist.
    } else {
      document.body.style.overflow = 'auto'; // Wiederherstellung des Scrollens.
    }
  }, [isContactOpen]);

  const handleClose = () => {
    setAnimateOut(true); // Startet die Slide-Up-Animation, wenn das Fenster geschlossen wird.
    setTimeout(() => {
      setAnimateOut(false);
      setShowContent(false); // Setzt den `showContent`-Zustand auf false, um das Fenster zu verbergen.
      setIsContactOpen(false); // Setzt den Zustand zurück, sodass das Fenster nicht mehr sichtbar ist.
    }, 500); // Hier sollte die Dauer der Animation (500 ms) übereinstimmen.
  };

  // Wenn das Fenster geschlossen wurde, wird nichts angezeigt.
  if (!showContent) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex items-start justify-center backdrop-blur-sm">
      <div
        className={`bg-white w-[80%] mt-12 rounded-xl relative shadow-xl max-h-[90vh] overflow-auto p-6
        ${animateOut ? 'animate-slideUp' : 'animate-slideDown'}`} // Zuweisung der Animationsklasse basierend auf `animateOut`
      >
        {/* X-Button zum Schließen des Fensters */}
        <button
          onClick={handleClose}
          className="fixed top-4 right-6 text-3xl font-bold text-gray-700 hover:text-red-500 z-50"
        >
          ×
        </button>

        <div className="mb-4">
          <p>📞 +41 78 30 69 668</p>
          <p>📞 +41 78 248 57 66</p>
        </div>

        <Contact />
      </div>
    </div>
  );
}
