import { useEffect } from 'react'
import menuImage from '../image/background_mobile_menu.webp'
import { useTranslation } from 'react-i18next'

export default function MobileMenu({ isOpen, onClose, setIsContactOpen }) {
  const { t, i18n } = useTranslation()

  // useEffect, um das Scrollen im Hintergrund zu verhindern, wenn das Menü geöffnet ist
  useEffect(() => {
    if (isOpen) {
      // Verhindert das Scrollen im Hintergrund
      document.body.style.overflow = 'hidden'
    } else {
      // Stellt das Scrollen wieder her, wenn das Menü geschlossen ist
      document.body.style.overflow = 'auto'
    }

    // Aufräumfunktion, um den Overflow zurückzusetzen, wenn der Komponent unmontiert wird
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-md z-50 flex flex-col items-center text-center justify-center uppercase font-navbar">
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close Menu"
        className="absolute top-4 right-4 text-3xl z-50"
      >
        ✕
      </button>
      <div className="absolute top-4 left-4 z-50">
        <select
          className="select select-sm border-primary w-16 md:w-40 bg-gray-300"
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          value={i18n.language}
          aria-label="Select Language"
        >
          <option value="en">EN</option>
          <option value="de">DE</option>
          <option value="es">ES</option>
        </select>
      </div>

      {/* Hintergrundbild */}
      <div className="absolute inset-0">
        <img
          src={menuImage}
          alt="Background"
          loading="lazy"
          className="w-full h-full object-cover pointer-events-none"
        />
        {/* Orange Overlay */}
        <div className="absolute inset-0 bg-orange-600 opacity-70"></div>
      </div>

      {/* Menüeinträge */}
      <nav className="flex flex-col gap-7 text-xl relative z-40">
        <a
          href="/"
          onClick={onClose}
          className="bg-white/30 px-6 py-2 rounded-md inline-block"
        >
          {t('navbar.info')}
        </a>
        <a
          href="/#location"
          onClick={onClose}
          className="bg-white/30 px-6 py-2 rounded-md inline-block"
        >
          {t('navbar.location')}
        </a>
        <a
          href="/#timeline"
          onClick={onClose}
          className="bg-white/30 px-6 py-2 rounded-md inline-block"
        >
          {t('navbar.timeline')}
        </a>
        <a
          href="/#rsvp"
          className="btn bg-secondary text-xl px-6 py-2 rounded font-rsvp1 inline-block"
          onClick={onClose}
        >
          RSVP
        </a>
        <a
          href="/ourhistory"
          onClick={onClose}
          className="bg-white/30 px-6 py-2 rounded-md inline-block"
        >
          {t('navbar.history')}
        </a>
        <a
          href="/guide"
          onClick={onClose}
          className="bg-white/30 px-6 py-2 rounded-md inline-block"
        >
          {t('navbar.guide')}
        </a>
        <button
          onClick={() => {
            setIsContactOpen(true)
            onClose()
          }}
          className="bg-white/30 px-6 py-2 rounded-md inline-block"
        >
          {t('navbar.contact')}
        </button>
      </nav>
    </div>
  )
}
