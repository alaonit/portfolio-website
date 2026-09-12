import { useEffect, useRef } from 'react'
import { profile } from '../../data/portfolio.js'
import Navigation from './Navigation.jsx'

function Hero() {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!stage) return undefined

    let animationFrame
    let measureFrame
    let measureTimer
    let isActive = true
    let letterCenters = []
    const letters = [...stage.querySelectorAll('.hero__letter')]

    const measureLetters = () => {
      letterCenters = letters.map((letter) => {
        const bounds = letter.getBoundingClientRect()
        return {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        }
      })
    }

    const resetLetters = () => {
      letters.forEach((letter) => {
        letter.style.setProperty('--letter-x', '0px')
        letter.style.setProperty('--letter-y', '0px')
        letter.style.setProperty('--letter-rotate', '0deg')
      })
    }

    const updateDepth = (event) => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const bounds = stage.getBoundingClientRect()
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2

        const depthStrength = reduceMotion ? 0 : 1
        const magneticStrength = reduceMotion ? 0.18 : 0.34
        const rotationStrength = reduceMotion ? 1.4 : 4
        const radius = reduceMotion ? 180 : 230

        stage.style.setProperty('--name-shift-x', `${x * 4 * depthStrength}px`)
        stage.style.setProperty('--name-shift-y', `${y * 3 * depthStrength}px`)
        stage.style.setProperty('--portrait-shift-x', `${x * -5 * depthStrength}px`)
        stage.style.setProperty('--portrait-shift-y', `${y * -4 * depthStrength}px`)

        if (letterCenters.length !== letters.length) measureLetters()

        letters.forEach((letter, index) => {
          const center = letterCenters[index]
          const deltaX = event.clientX - center.x
          const deltaY = event.clientY - center.y
          const distance = Math.hypot(deltaX, deltaY)
          const force = Math.max(0, 1 - distance / radius)

          letter.style.setProperty('--letter-x', `${deltaX * force * magneticStrength}px`)
          letter.style.setProperty('--letter-y', `${deltaY * force * magneticStrength}px`)
          letter.style.setProperty('--letter-rotate', `${(deltaX / radius) * force * rotationStrength}deg`)
        })
      })
    }

    const resetDepth = () => {
      stage.style.setProperty('--name-shift-x', '0px')
      stage.style.setProperty('--name-shift-y', '0px')
      stage.style.setProperty('--portrait-shift-x', '0px')
      stage.style.setProperty('--portrait-shift-y', '0px')
      resetLetters()
    }

    measureFrame = requestAnimationFrame(measureLetters)
    measureTimer = window.setTimeout(measureLetters, 1300)
    document.fonts?.ready.then(() => {
      if (isActive) measureLetters()
    })

    stage.addEventListener('mousemove', updateDepth)
    stage.addEventListener('mouseenter', measureLetters)
    stage.addEventListener('mouseleave', resetDepth)
    window.addEventListener('resize', measureLetters)

    return () => {
      isActive = false
      cancelAnimationFrame(animationFrame)
      cancelAnimationFrame(measureFrame)
      window.clearTimeout(measureTimer)
      stage.removeEventListener('mousemove', updateDepth)
      stage.removeEventListener('mouseenter', measureLetters)
      stage.removeEventListener('mouseleave', resetDepth)
      window.removeEventListener('resize', measureLetters)
    }
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__stage" ref={stageRef}>
        <Navigation />

        <h1 className="hero__name" id="hero-title" aria-label={profile.displayName}>
          {profile.displayName.split('').map((character, index) => (
            <span className="hero__letter" aria-hidden="true" key={`${character}-${index}`}>
              {character === ' ' ? '\u00A0' : character}
            </span>
          ))}
        </h1>

        <div className="hero__portrait">
          <img src={profile.portrait} alt={profile.portraitAlt} fetchPriority="high" />
        </div>

        <p className="hero__roles">
          <span>{profile.rolePrimary}</span>
        </p>

        <a className="hero__scroll" href="#approach" aria-label="Continue to the approach section">
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default Hero
