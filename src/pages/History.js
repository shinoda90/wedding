import { useTranslation } from 'react-i18next'
import { ReactComponent as ArriveIcon } from '../icons/pigeon.svg'
import { ReactComponent as ChurchIcon } from '../icons/church.svg'
import { ReactComponent as CakeIcon } from '../icons/cup_cake.svg'
import { ReactComponent as GamesIcon } from '../icons/crown.svg'
import { ReactComponent as FoodIcon } from '../icons/plate.svg'
import { ReactComponent as PartyIcon } from '../icons/party.svg'
import Title from '../Components/Title'

export default function History({ title }) {
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
    <div className="pt-10 max-w-6xl m-auto pb-20">
      <Title title={t('navbar.history')} />
      {/* Mobile Version */}
      <div className="block md:hidden pl-2 pr-4 mt-8">
        <ul className="flex flex-col gap-8">
          {icons.map((Icon, index) => (
            <li key={index} className="flex items-start gap-4 relative">
              {/* Vertikale Linie */}
              {index !== icons.length - 1 && ( // nicht beim letzten Eintrag
                <div className="absolute left-5 top-0 bottom-[-2rem] flex justify-center">
                  <div className="w-0.5 bg-secondary h-full"></div>
                </div>
              )}

              {/* Icon linke Spalte */}
              <div className="w-10 flex-shrink-0 flex justify-center relative z-10">
                <div className="bg-gray-200 p-2 rounded-full shadow-md -mt-2">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
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
          {icons.map((Icon, index) => (
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

              <div className="w-10 relative flex justify-center">
                {/* Vertikale Linie */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-secondary"></div>

                {/* Icon */}
                <div className="absolute top-0 bg-gray-200 p-2 rounded-full shadow-md -mt-3">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
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
    </div>
  )
}
