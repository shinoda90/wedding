import { useTranslation } from 'react-i18next'
import React from 'react'
import arriveIcon from '../icons/historyIcon1.svg'
import churchIcon from '../icons/historyIcon2.svg'
import cakeIcon from '../icons/historyIcon3.svg'
import gamesIcon from '../icons/historyIcon4.svg'
import foodIcon from '../icons/historyIcon5.svg'
import partyIcon from '../icons/historyIcon6.svg'
import Title from '../Components/Title'

export default function History() {
  const { t } = useTranslation()

  const icons = [
    arriveIcon,
    churchIcon,
    cakeIcon,
    gamesIcon,
    foodIcon,
    partyIcon,
  ]

  return (
    <div className="pt-10 max-w-6xl m-auto pb-20">
      <Title title={t('navbar.history')} />
      <img
        src="/images/flowers.png"
        alt="Flowers"
        className="block md:hidden absolute top-16 left-[-0%] h-12 pointer-events-none z-0"
      />
      {/* Mobile Version */}
      <div className="block md:hidden pl-2 pr-8 mt-8">
        <ul className="flex flex-col gap-8">
          {icons.map((iconSrc, index) => (
            <li key={index} className="flex items-start gap-2 relative">
              {/* Vertikale Linie */}

              <div className="absolute left-5 top-0 bottom-[-2rem] flex justify-center">
                <div className="w-0.5 bg-secondary h-full"></div>
              </div>

              {/* Icon linke Spalte */}
              <div className="w-10 flex-shrink-0 flex justify-center relative z-10">
                <img
                  src={iconSrc}
                  alt={`icon-${index}`}
                  className=" h-10 rounded-full shadow-md -mt-2 top-0 p-1 bg-white"
                />
              </div>

              {/* Text rechte Spalte */}
              <div>
                <time className="block font-tl-time mb-1">
                  {t(`history.time${index + 1}`)}
                </time>
                <div className="text-lg font-tl-title">
                  {t(`history.title${index + 1}`)}
                </div>
                <p className="font-tl-text text-justify">
                  {t(`history.descr${index + 1}`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block">
        <ul className="grid grid-cols-[1fr_auto_1fr] gap-x-2 gap-y-4">
          {icons.map((iconSrc, index) => (
            <li key={index} className="contents">
              {/* Linker Text oder leer */}
              {index % 2 === 0 ? (
                <div className="flex justify-end text-end pr-4">
                  <div>
                    <time className="block font-tl-time mb-1">
                      {t(`history.time${index + 1}`)}
                    </time>
                    <div className="text-lg font-tl-title">
                      {t(`history.title${index + 1}`)}
                    </div>
                    <p className="font-tl-text text-justify">
                      {t(`history.descr${index + 1}`)}
                    </p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div className="w-16 relative flex justify-center">
                {/* Vertikale Linie */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-secondary"></div>

                {/* Icon */}

                <img
                  src={iconSrc}
                  alt={`icon-${index}`}
                  className="absolute h-14 rounded-full shadow-md -mt-3 top-0 p-1 bg-white"
                />
              </div>

              {/* Rechter Text oder leer */}
              {index % 2 !== 0 ? (
                <div className="flex justify-start text-start pl-4">
                  <div>
                    <time className="block font-tl-time mb-1">
                      {t(`history.time${index + 1}`)}
                    </time>
                    <div className="text-lg font-tl-title">
                      {t(`history.title${index + 1}`)}
                    </div>
                    <p className="font-tl-text text-justify">
                      {t(`history.descr${index + 1}`)}
                    </p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Titel & Intro vor Bildergalerie */}
      <div className="text-center mt-16 px-4">
        <h2 className="text-3xl font-bold font-slogan mb-4">
          {t('history.album')}
        </h2>
        <p className="text-lg font-light font-tl-text max-w-3xl mx-auto">
          {t('history.intro')}
        </p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-2">
        {Array.from({ length: 97 }, (_, i) => {
          const index = i + 1
          const filename = t(`history.pictureTime${index + 1}`)
          const year = filename.split('-')[0] // Extrahiere Jahr z. B. "2023" aus "2023-07-16"

          // Jahr vom vorherigen Bild holen (außer beim ersten Bild)
          const prevFilename =
            index > 1 ? t(`history.pictureTime${index}`) : null
          const prevYear = prevFilename?.split('-')[0]

          const showYearDivider = year !== prevYear

          return (
            <React.Fragment key={index}>
              {showYearDivider && (
                <div className="text-4xl font-bold my-8 text-center font-slogan mt-10 col-span-full">
                  {year}
                </div>
              )}
              <div className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow">
                <img
                  src={`/images/history/${filename}.webp`}
                  alt={filename}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">
                    {t(`history.pictureTitle${index + 1}`)}
                  </h3>
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </section>
    </div>
  )
}
