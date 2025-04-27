import { useInView } from 'react-intersection-observer'
import Title from './Title'

export default function SectionWrapper({ id, title, children }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section id={id} className="scroll-mt-24 lg:min-h-[calc(100vh-4rem)]">
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-1/4 opacity-0'
        }`}
      >
        <Title title={title} />
        {children}
      </div>
    </section>
  )
}
