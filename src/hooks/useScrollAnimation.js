import { useState, useEffect, useRef } from 'react'

const useScrollAnimation = (isJumping) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    if (isJumping) {
      setIsVisible(true) // Beim Sprung direkt sichtbar machen
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [isJumping])

  return [isVisible, elementRef]
}

export default useScrollAnimation
