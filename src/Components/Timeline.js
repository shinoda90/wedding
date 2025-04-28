import TimelineStep from './TimelineStep'
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
      <ul className="timeline max-md:timeline-compact timeline-vertical mt-10 snap-none scroll-smooth">
        {icons.map((Icon, index) => (
          <TimelineStep
            key={index}
            Icon={Icon}
            containerClass={
              index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end'
            }
            time={t(`timeline.time${index + 1}`)}
            step={t(`timeline.step${index + 1}`)}
            descr={t(`timeline.descr${index + 1}`)}
            isLast={index === icons.length - 1} // Flag für letztes Element
          />
        ))}
      </ul>
    </>
  )
}
