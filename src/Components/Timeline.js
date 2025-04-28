import { useTranslation } from 'react-i18next'
import { ReactComponent as ArriveIcon } from '../icons/pigeon.svg'
import { ReactComponent as ChurchIcon } from '../icons/church.svg'
import { ReactComponent as CakeIcon } from '../icons/cup_cake.svg'
import { ReactComponent as GamesIcon } from '../icons/crown.svg'
import { ReactComponent as FoodIcon } from '../icons/plate.svg'
import { ReactComponent as PartyIcon } from '../icons/party.svg'

export default function Timeline() {
  const { t } = useTranslation()

  const icons = [
    ArriveIcon,
    ChurchIcon,
    CakeIcon,
    GamesIcon,
    FoodIcon,
    PartyIcon,
  ]

  return (
    <>
      {/* Mobile Version */}
      <div className="block md:hidden">
        <ul className="flex flex-col gap-8">
          {icons.map((Icon, index) => (
            <li key={index} className="flex items-start gap-4">
              {/* Icon linke Spalte */}
              <div className="w-12 flex-shrink-0 flex justify-center relative">
                <div className="bg-gray-200 p-2 rounded-full shadow-md -mt-3">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
              </div>

              {/* Text rechte Spalte */}
              <div>
                <time className="block font-tl-time mb-1">
                  {t(`timeline.time${index + 1}`)}
                </time>
                <div className="text-lg font-tl-title">
                  {t(`timeline.step${index + 1}`)}
                </div>
                <i className="font-tl-text">
                  {t(`timeline.descr${index + 1}`)}
                </i>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block">
        <ul className="grid grid-cols-[1fr_auto_1fr] gap-x-2 gap-y-4">
          {icons.map((Icon, index) => (
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
                    <i className="font-tl-text">
                      {t(`timeline.descr${index + 1}`)}
                    </i>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              {/* Icon Mitte (nur so breit wie Icon nötig) */}
              <div className="w-10 relative flex justify-center">
                {/* Vertikale Linie */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-secondary
      ${index === 0 ? 'top-1/2' : 'top-0'}
      ${index === icons.length - 1 ? 'bottom-1/2' : 'bottom-0'}
    `}
                  style={{
                    top: index === 0 ? '50%' : '20',
                    bottom: index === icons.length - 1 ? '50%' : '10',
                  }}
                ></div>

                {/* Icon Container */}
                <div className="absolute top-0 bg-gray-200 p-2 rounded-full shadow-md -mt-3">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
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
                    <i className="font-tl-text">
                      {t(`timeline.descr${index + 1}`)}
                    </i>
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
