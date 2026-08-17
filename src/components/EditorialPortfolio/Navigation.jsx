import { useEffect, useRef, useState } from 'react'
import { navigation, profile } from '../../data/portfolio.js'

function Navigation() {
  const navigationRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const [activeHref, setActiveHref] = useState('')

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  useEffect(() => {
    let animationFrame

    const updateNavigation = () => {
      setIsPastHero(window.scrollY > window.innerHeight - 88)

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      navigationRef.current?.style.setProperty('--scroll-progress', scrollProgress)

      const currentSection = navigation.reduce((active, item) => {
        const section = document.querySelector(item.href)
        if (!section) return active

        return section.getBoundingClientRect().top <= window.innerHeight * 0.38
          ? item.href
          : active
      }, '')

      setActiveHref(currentSection)
    }

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(updateNavigation)
    }

    updateNavigation()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <nav
      ref={navigationRef}
      className={`hero-nav ${isPastHero ? 'hero-nav--scrolled' : ''}`}
      aria-label="Primary navigation"
    >
      <a className="hero-nav__brand" href="#top" onClick={closeMenu}>
        {profile.fullName}
      </a>

      <div className="hero-nav__desktop">
        {navigation.map((item) => (
          <a
            className={activeHref === item.href ? 'is-active' : ''}
            key={item.href}
            href={item.href}
            aria-current={activeHref === item.href ? 'location' : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div id="mobile-menu" className={`mobile-menu ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="mobile-menu__inner">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu} tabIndex={isOpen ? 0 : -1}>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <span className="hero-nav__progress" aria-hidden="true" />
    </nav>
  )
}

export default Navigation
