import { useEffect } from 'react';
import menuImage from '../image/background_mobile_menu.webp';
import { useTranslation } from 'react-i18next';

export default function MobileMenu({ isOpen, onClose }) {
  const { t } = useTranslation();

  // useEffect, um das Scrollen im Hintergrund zu verhindern, wenn das Menü geöffnet ist
  useEffect(() => {
    if (isOpen) {
      // Verhindert das Scrollen im Hintergrund
      document.body.style.overflow = 'hidden';
    } else {
      // Stellt das Scrollen wieder her, wenn das Menü geschlossen ist
      document.body.style.overflow = 'auto';
    }

    // Aufräumfunktion, um den Overflow zurückzusetzen, wenn der Komponent unmontiert wird
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-md z-50 flex flex-col items-center text-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close Menu"
        className="absolute top-6 right-6 text-white text-3xl z-50"
      >
        ✕
      </button>

      {/* Hintergrundbild */}
      <div className="absolute inset-0">
        <img
          src={menuImage}
          alt="Background"
          className="w-full h-full object-cover opacity-50 pointer-events-none"
        />
      </div>

      {/* Menüeinträge */}
      <nav className="flex flex-col gap-10 text-white text-2xl relative z-40">
        <a href="/" onClick={onClose}>
          {t('navbar.home')}
        </a>
        <a href="/#location" onClick={onClose}>
          {t('navbar.location')}
        </a>
        <a href="/#timeline" onClick={onClose}>
          {t('navbar.timeline')}
        </a>
        <a href="/#rsvp" className="bg-purple-500 px-4 py-2 rounded" onClick={onClose}>
          RSVP
        </a>
        <a href="/ourhistory" onClick={onClose}>
          {t('navbar.history')}{' '}
        </a>
        <a href="/guide" onClick={onClose}>
          {t('navbar.guide')}{' '}
        </a>
        <a href="/#contact" onClick={onClose}>
          Contact Us
        </a>
      </nav>
    </div>
  );
}
