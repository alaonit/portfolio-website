import { useEffect, useRef } from 'react'
import { featuredProject } from '../../data/portfolio.js'
import Reveal from './Reveal.jsx'

function Work() {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!card || reduceMotion) return undefined

    let animationFrame

    const updateSpotlight = (event) => {
      if (event.pointerType === 'touch') return

      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const bounds = card.getBoundingClientRect()
        const x = ((event.clientX - bounds.left) / bounds.width) * 100
        const y = ((event.clientY - bounds.top) / bounds.height) * 100

        card.style.setProperty('--spotlight-x', `${x}%`)
        card.style.setProperty('--spotlight-y', `${y}%`)
      })
    }

    card.addEventListener('pointermove', updateSpotlight)

    return () => {
      cancelAnimationFrame(animationFrame)
      card.removeEventListener('pointermove', updateSpotlight)
    }
  }, [])

  return (
    <section className="work" id="projects" aria-labelledby="work-title">
      <Reveal as="header" className="work__heading">
        <div>
          <span className="section-kicker">02 / Projects</span>
          <h2 id="work-title" data-scroll-text>Selected work</h2>
        </div>
        <p>Focused products built to solve real problems with clarity and care.</p>
      </Reveal>
      <Reveal className="project-card" elementRef={cardRef}>
        <div className="project-card__content">
          <span className="project-card__year">({featuredProject.year})</span>
          <div>
            <h3>{featuredProject.title}</h3>
            <p>{featuredProject.description}</p>
          </div>
          <ul className="project-card__tech" aria-label="Technologies used">
            {featuredProject.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <a
            className="project-card__link"
            href={featuredProject.href}
            target="_blank"
            rel="noreferrer"
          >
            Visit project <span aria-hidden="true">↗</span>
          </a>
        </div>

        <a
          className="project-card__visual"
          href={featuredProject.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${featuredProject.title} project`}
        >
          <span className="project-card__media">
            <img src={featuredProject.image} alt={featuredProject.imageAlt} loading="lazy" />
          </span>
        </a>
      </Reveal>
    </section>
  )
}

export default Work
