import { useInView } from 'react-intersection-observer'
import Title from './Title'
import { useEffect } from 'react'

export default function SectionWrapper({ id, title, children }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    console.log(`Section ${id} inView:`, inView)
  }, [inView])

  return (
    <section id={id} className="scroll-mt-24 mx-auto">
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          title && inView
            ? 'translate-y-0 opacity-100'
            : title
              ? 'translate-y-1/4 opacity-0'
              : ''
        }`}
      >
        {title && <Title title={title} />}
        {children}
      </div>
    </section>
  )
}
