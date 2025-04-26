import TimelineStep from './TimelineStep';
import { useTranslation } from 'react-i18next';

export default function Timeline({ title }) {
  const { t } = useTranslation();

  return (
    <>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {[...Array(6)].map((_, index) => (
          <TimelineStep
            key={index}
            containerClass={
              index % 2 === 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end md:mb-10'
            }
            time={t(`timeline.time${index + 1}`)}
            step={t(`timeline.step${index + 1}`)}
            descr={t(`timeline.descr${index + 1}`)}
          />
        ))}
      </ul>
    </>
  );
}
