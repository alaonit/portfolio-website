import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../gsap-setup.js'
import './ScrollStack.css'

// Adapted from React Bits' Scroll Stack: https://reactbits.dev/components/scroll-stack
// Uses the site's existing Lenis/ScrollTrigger connection and untransformed slots
// so measurements stay stable while the cards are translating and scaling.
export function ScrollStackItem({ children, className = '', ...props }) {
  return (
    <div className="scroll-stack__slot">
      <article className={`scroll-stack__card ${className}`} {...props}>
        {children}
      </article>
    </div>
  )
}

function ScrollStack({ children, itemScale = 0.035, itemStackDistance = 24 }) {
  const stackRef = useRef(null)

  useGSAP(() => {
    const stack = stackRef.current
    const slots = [...stack.querySelectorAll('.scroll-stack__slot')]
    const cards = slots.map((slot) => slot.querySelector('.scroll-stack__card'))
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference) and (min-height: 540px)', () => {
      let positions = []
      let pinEnd = 0
      let scaleDistance = 0
      let disposed = false

      const measure = () => {
        const viewportHeight = window.innerHeight
        const stackPosition = Math.max(96, viewportHeight * 0.16)
        scaleDistance = viewportHeight * 0.22
        positions = slots.map((slot, index) => (
          slot.getBoundingClientRect().top + window.scrollY
          - stackPosition - index * itemStackDistance
        ))
        pinEnd = positions.at(-1) + viewportHeight * 0.38
      }

      const update = () => {
        const scrollTop = window.scrollY

        cards.forEach((card, index) => {
          const start = positions[index]
          const progress = gsap.utils.clamp(0, 1, (scrollTop - start) / scaleDistance)
          const targetScale = 1 - (cards.length - 1 - index) * itemScale
          const scale = 1 - progress * (1 - targetScale)
          const translateY = Math.max(0, Math.min(scrollTop, pinEnd) - start)
          card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
        })
      }

      cards.forEach((card) => { card.style.willChange = 'transform' })
      measure()
      const trigger = ScrollTrigger.create({
        trigger: stack,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: update,
        onRefresh: () => {
          measure()
          update()
        },
        invalidateOnRefresh: true,
      })

      // Refresh when upstream content, fonts, or responsive card sizes change.
      let refreshFrame
      const scheduleRefresh = () => {
        cancelAnimationFrame(refreshFrame)
        refreshFrame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh()
        })
      }
      const observer = new ResizeObserver(scheduleRefresh)
      observer.observe(document.body)
      slots.forEach((slot) => observer.observe(slot))
      document.fonts.ready.then(() => {
        if (!disposed) scheduleRefresh()
      })
      update()

      return () => {
        disposed = true
        cancelAnimationFrame(refreshFrame)
        observer.disconnect()
        trigger.kill()
        cards.forEach((card) => {
          card.style.removeProperty('transform')
          card.style.removeProperty('will-change')
        })
      }
    })

    return () => media.revert()
  }, { scope: stackRef, dependencies: [itemScale, itemStackDistance], revertOnUpdate: true })

  return (
    <div className="scroll-stack" ref={stackRef}>
      {children}
      <div className="scroll-stack__end" aria-hidden="true" />
    </div>
  )
}

export default ScrollStack
