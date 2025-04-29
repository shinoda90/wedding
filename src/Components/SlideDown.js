import Contact from './Contact'
import { useEffect, useState } from 'react'
import Title from './Title'
import Whatsapp from './Whatsapp'
import { useTranslation } from 'react-i18next'
import CloseButton from './CloseButton'

export default function SlideDown({ isContactOpen, setIsContactOpen }) {
  const { t } = useTranslation()
  const [showContent, setShowContent] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    if (isContactOpen) {
      setShowContent(true)
      document.body.style.overflow = 'hidden' // Verhindert das Scrollen der Seite, wenn das SlideDown geöffnet ist.
    } else {
      document.body.style.overflow = 'auto' // Wiederherstellung des Scrollens.
    }
  }, [isContactOpen])

  const handleClose = () => {
    setAnimateOut(true) // Startet die Slide-Up-Animation, wenn das Fenster geschlossen wird.
    setTimeout(() => {
      setAnimateOut(false)
      setShowContent(false) // Setzt den `showContent`-Zustand auf false, um das Fenster zu verbergen.
      setIsContactOpen(false) // Setzt den Zustand zurück, sodass das Fenster nicht mehr sichtbar ist.
    }, 500) // Hier sollte die Dauer der Animation (500 ms) übereinstimmen.
  }

  // Wenn das Fenster geschlossen wurde, wird nichts angezeigt.
  if (!showContent) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className={`bg-primary w-[90%] lg:w-[50%] rounded-xl relative shadow-xl max-h-[90vh] overflow-auto lg:p-6 p-4
    ${animateOut ? 'animate-slideUp' : 'animate-slideDown'}`}
      >
        {/* X-Button zum Schließen des Fensters */}
        <CloseButton onClick={handleClose} />
        <div className="-mt-10">
          <Title title={t('navbar.contact')} />
        </div>
        <Whatsapp />
        <Contact />
      </div>
    </div>
  )
}
