import Location from '../Components/Location'
import Timeline from '../Components/Timeline'
import IntroBild from '../Components/IntroBild'
import SectionWrapper from '../Components/SectionWrapper'
import RSVP from '../Components/RSVP'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="bg-primary">
      <SectionWrapper id="home" title="">
        <IntroBild />
      </SectionWrapper>

      <div className="w-full px-4 lg:w-[70%] lg:px-0 mx-auto">
        <SectionWrapper id="location" title={t('navbar.location')}>
          <Location />
        </SectionWrapper>

        <SectionWrapper id="timeline" title={t('navbar.timeline')}>
          <Timeline />
        </SectionWrapper>

        <SectionWrapper id="rsvp" title="RSVP">
          <RSVP />
        </SectionWrapper>
      </div>
    </div>
  )
}
