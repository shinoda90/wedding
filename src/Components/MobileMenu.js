import { useEffect } from 'react'
import menuImage from '../image/background_mobile_menu.webp'
import { useTranslation } from 'react-i18next'
import MobileMenuEntry from './MobileMenuEntry'

export default function MobileMenu({ isOpen, onClose, setIsContactOpen }) {
  const { t, i18n } = useTranslation()
  const firstMenuItems = [
    { href: '/#info', text: t('navbar.info') },
    { href: '/#location', text: t('navbar.location') },
    { href: '/#timeline', text: t('navbar.timeline') },
  ]
  const secondMenuItems = [
    { href: '/ourhistory', text: t('navbar.history') },
    { href: '/guide', text: t('navbar.guide') },
  ]

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
          className="select select-sm border-primary w-16 md:w-40 bg-black/40"
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
        <div className="absolute inset-0 bg-orange-400 opacity-70"></div>
      </div>

      {/* Menüeinträge */}
      <nav className="flex flex-col gap-7 text-xl relative z-40">
        {firstMenuItems.map((item, index) => (
          <MobileMenuEntry
            key={index}
            href={item.href}
            text={item.text}
            onClick={onClose}
          />
        ))}

        {/* RSVP-Button extra */}
        <a
          href="/#rsvp"
          className="btn bg-secondary text-xl px-6 py-2 rounded font-rsvp1 inline-block"
          onClick={onClose}
        >
          RSVP
        </a>

        {/* Rechte Seite */}
        {secondMenuItems.map((item, index) => (
          <MobileMenuEntry
            key={`second-${index}`}
            href={item.href}
            text={item.text}
            onClick={onClose}
          />
        ))}
        <button
          onClick={() => {
            setIsContactOpen(true)
            onClose()
          }}
          className="bg-black/40 px-6 py-2 rounded-md inline-block uppercase"
        >
          {t('navbar.contact')}
        </button>
      </nav>
    </div>
  )
}
