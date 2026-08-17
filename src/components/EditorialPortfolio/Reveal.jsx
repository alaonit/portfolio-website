import { createElement, useEffect, useRef, useState } from 'react'

function Reveal({ as: Component = 'div', className = '', children, elementRef: externalRef, ...props }) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const assignRef = (element) => {
    elementRef.current = element

    if (typeof externalRef === 'function') externalRef(element)
    else if (externalRef) externalRef.current = element
  }

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return createElement(
    Component,
    {
      ref: assignRef,
      className: `reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim(),
      ...props,
    },
    children,
  )
}

export default Reveal
