import { useTranslation } from 'react-i18next'

import arriveIcon from '../icons/scheduleIcon1.svg'
import churchIcon from '../icons/scheduleIcon2.svg'
import cakeIcon from '../icons/scheduleIcon3.svg'
import gamesIcon from '../icons/scheduleIcon4.svg'
import foodIcon from '../icons/scheduleIcon5.svg'
import partyIcon from '../icons/scheduleIcon6.svg'

export default function Timeline() {
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
    <>
      {/* Mobile Version */}
      <div className="block md:hidden pl-2 pr-8 mt-8 -mx-4">
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
                  {t(`timeline.time${index + 1}`)}
                </time>
                <div className="text-lg font-tl-title">
                  {t(`timeline.step${index + 1}`)}
                </div>
                <p className="font-tl-text">
                  {t(`timeline.descr${index + 1}`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block mt-12 max-w-[1000px] mx-auto mb-12">
        <ul className="grid grid-cols-[1fr_auto_1fr] gap-x-2 gap-y-6">
          {icons.map((iconSrc, index) => (
            <li key={index} className="contents">
              {/* Linker Text oder leer */}
              {index % 2 === 0 ? (
                <div className="flex justify-end text-end pr-4">
                  <div>
                    <time className="block font-tl-time mb-1">
                      {t(`timeline.time${index + 1}`)}
                    </time>
                    <div className="text-lg font-tl-title">
                      {t(`timeline.step${index + 1}`)}
                    </div>
                    <p className="font-tl-text text-justify">
                      {t(`timeline.descr${index + 1}`)}
                    </p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div className="w-12 relative flex justify-center">
                {/* Vertikale Linie */}

                <div className="absolute top-0 -bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-secondary"></div>

                {/* Icon */}
                <img
                  src={iconSrc}
                  alt={`icon-${index}`}
                  className="absolute h-12 rounded-full shadow-md -mt-3 top-0 p-1 bg-white"
                />
              </div>

              {/* Rechter Text oder leer */}
              {index % 2 !== 0 ? (
                <div className="flex justify-start text-start pl-4">
                  <div>
                    <time className="block font-tl-time mb-1">
                      {t(`timeline.time${index + 1}`)}
                    </time>
                    <div className="text-lg font-tl-title">
                      {t(`timeline.step${index + 1}`)}
                    </div>
                    <p className="font-tl-text text-justify">
                      {t(`timeline.descr${index + 1}`)}
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
    </>
  )
}
