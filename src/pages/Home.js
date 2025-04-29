import Location from '../Components/Location'
import Timeline from '../Components/Timeline'
import IntroBild from '../Components/IntroBild'
import SectionWrapper from '../Components/SectionWrapper'
import RSVP from '../Components/RSVP'
import { useTranslation } from 'react-i18next'
import Info from '../Components/Info'
import SectionDivider from '../Components/SectionDivider'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="bg-primary">
      <SectionWrapper id="home" title="">
        <IntroBild />
      </SectionWrapper>

      <div className="w-full px-4 lg:w-[70%] lg:px-0 mx-auto">
        <SectionWrapper id="info" title={t('navbar.info')}>
          <Info />
        </SectionWrapper>
        <SectionDivider />
        <SectionWrapper id="location" title={t('navbar.location')}>
          <div className="md:overflow-x-hidden">
            <Location />
          </div>
        </SectionWrapper>
        <SectionDivider />
        <SectionWrapper id="timeline" title={t('navbar.timeline')}>
          <Timeline />
        </SectionWrapper>
        <SectionDivider />
        <SectionWrapper id="rsvp" title="RSVP">
          <RSVP />
        </SectionWrapper>
      </div>
    </div>
  )
}
