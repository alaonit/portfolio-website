import { gsap, ScrollTrigger, SplitText, useGSAP } from '../../gsap-setup.js'
import { acquireWindowLenis, releaseWindowLenis } from '../../lenis-setup.js'

function ScrollExperience() {
  useGSAP(() => {
    const media = gsap.matchMedia()
    let refreshFrame

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = acquireWindowLenis()
      const syncScrollTrigger = () => ScrollTrigger.update()
      const handleAnchorClick = (event) => {
        if (
          event.defaultPrevented
          || event.button !== 0
          || event.metaKey
          || event.ctrlKey
          || event.shiftKey
          || event.altKey
          || !(event.target instanceof Element)
        ) return

        const anchor = event.target.closest('a[href^="#"]')
        const href = anchor?.getAttribute('href')
        const target = href && href.length > 1
          ? document.getElementById(href.slice(1))
          : null

        if (!target) return

        event.preventDefault()
        if (window.location.hash !== href) window.history.pushState(null, '', href)

        lenis.scrollTo(target, {
          offset: target.id === 'top' || target.id === 'main-content' ? 0 : -88,
          duration: 1.25,
        })
      }

      lenis.on('scroll', syncScrollTrigger)
      document.addEventListener('click', handleAnchorClick)

      const sharedTrigger = {
        invalidateOnRefresh: true,
      }
      const textSplits = []

      gsap.utils.toArray('[data-scroll-text]').forEach((heading) => {
        const split = SplitText.create(heading, {
          type: 'words',
          wordsClass: 'scroll-reveal-word',
        })

        textSplits.push(split)

        gsap.fromTo(split.words,
          {
            yPercent: 42,
            opacity: 0.12,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: {
              ...sharedTrigger,
              trigger: heading,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 0.4,
            },
          },
        )
      })

      gsap.timeline({
        scrollTrigger: {
          ...sharedTrigger,
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.45,
        },
      })
        .to('.hero__stage', {
          '--name-scroll-y': '-72px',
          '--portrait-scroll-y': '36px',
          ease: 'none',
        }, 0)
        .to('.hero__name', { opacity: 0.14, ease: 'none' }, 0)
        .to('.hero__roles, .hero__scroll', {
          opacity: 0,
          y: -24,
          ease: 'none',
        }, 0)

      gsap.from('.manifesto__meta span', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          ...sharedTrigger,
          trigger: '.manifesto__meta',
          start: 'top 86%',
          once: true,
        },
      })

      gsap.fromTo('.manifesto__ghost',
        { xPercent: -5 },
        {
          xPercent: 5,
          ease: 'none',
          scrollTrigger: {
            ...sharedTrigger,
            trigger: '.manifesto',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.55,
          },
        },
      )

      gsap.fromTo('.project-card__media',
        { scale: 1.12, yPercent: -3 },
        {
          scale: 1.02,
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            ...sharedTrigger,
            trigger: '.project-card',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.55,
          },
        },
      )

      gsap.from('.project-card__content > *', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          ...sharedTrigger,
          trigger: '.project-card__content',
          start: 'top 78%',
          once: true,
        },
      })

      gsap.from('.work__heading p', {
        y: 34,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          ...sharedTrigger,
          trigger: '.work__heading',
          start: 'top 84%',
          once: true,
        },
      })

      gsap.fromTo('.skills-section__header h2',
        { xPercent: -4 },
        {
          xPercent: 3,
          ease: 'none',
          scrollTrigger: {
            ...sharedTrigger,
            trigger: '.skills-section__header',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.55,
          },
        },
      )

      gsap.utils.toArray('.skill-card').forEach((card) => {
        const cardContent = card.querySelectorAll('.skill-card__meta, .skill-card__icon, .skill-card__copy')

        gsap.from(cardContent, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            ...sharedTrigger,
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        })
      })

      gsap.from('.profile-sequence__heading p', {
        y: 38,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          ...sharedTrigger,
          trigger: '.profile-sequence__heading',
          start: 'top 82%',
          once: true,
        },
      })

      gsap.from('.about-card h3, .about-card__foot', {
        y: 38,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          ...sharedTrigger,
          trigger: '.about-card',
          start: 'top 76%',
          once: true,
        },
      })

      gsap.from('.capabilities-card__number, .capabilities-card__body, .capabilities-card__image', {
        y: 42,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          ...sharedTrigger,
          trigger: '.capabilities-card',
          start: 'top 78%',
          once: true,
        },
      })

      gsap.fromTo('.profile-sequence__ghost',
        { xPercent: -6 },
        {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: {
            ...sharedTrigger,
            trigger: '.profile-sequence',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.55,
          },
        },
      )

      gsap.from('.contact__topline, .contact__kicker, .contact__intro > p, .contact__direct, .contact-form', {
        y: 42,
        opacity: 0,
        duration: 0.95,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          ...sharedTrigger,
          trigger: '.contact',
          start: 'top 72%',
          once: true,
        },
      })

      gsap.fromTo('.contact__word',
        { xPercent: -5 },
        {
          xPercent: 3,
          ease: 'none',
          scrollTrigger: {
            ...sharedTrigger,
            trigger: '.contact',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.55,
          },
        },
      )

      return () => {
        textSplits.forEach((split) => split.revert())
        document.removeEventListener('click', handleAnchorClick)
        lenis.off('scroll', syncScrollTrigger)
        releaseWindowLenis()
      }
    })

    refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(refreshFrame)
      media.revert()
    }
  }, [])

  return null
}

export default ScrollExperience
