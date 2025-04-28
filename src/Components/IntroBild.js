import homeimage from '../image/intro-foto.webp'
import homeimage2 from '../image/intro-foto2.webp'
import Countdown from './Countdown'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function IntroBild({ onLoad }) {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    const img = document.getElementById('hero-img') // oder passendes img
    if (img && !img.complete) {
      img.onload = () => onLoad?.()
    } else {
      onLoad?.()
    }
  }, [onLoad])

  return (
    <div className="relative h-screen w-full">
      {/* Hintergrundbild */}
      <img
        src={homeimage2}
        onLoad={() => {
          setTimeout(onLoad, 100)
        }}
        alt="Dani & Michel"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Schwarzes Overlay */}
      <div className="absolute inset-0 bg-gray-700 bg-opacity-60"></div>

      {/* Obere Texte (Datum und Ort) */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-10 px-4">
        <div className="text-3xl lg:text-5xl whitespace-nowrap font-slogan">
          {t('home.date')}
        </div>
        <div className="text-lg lg:text-2xl whitespace-nowrap font-location">
          Cardedeu, Lago Coatepeque, El Salvador
        </div>
      </div>

      {/* Hauptüberschrift (keine Zeilenumbrüche auf Mobile) */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4 py-0">
        <div className="font-names2 whitespace-nowrap text-[12vw] sm:text-8xl">
          Daniela & Michel
        </div>
        <div className="font-slogan whitespace-nowrap text-[6vw] sm:text-8xl -mt-4 mb-4 lg:text-5xl lg:p-5">
          Going to Forever
        </div>
      </div>

      {/* RSVP Button und Countdown unten */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-4 px-4">
        <a
          href="#rsvp"
          className="btn bg-secondary hover:bg-secondary/80 text-lg h-10 min-h-10 px-4 flex items-center justify-center font-rsvp1
  lg:text-2xl lg:h-14 lg:min-h-14 lg:px-8"
        >
          RSVP
        </a>

        <div className="flex justify-center items-center gap-4">
          <Countdown />
        </div>
      </div>
    </div>
  )
}
