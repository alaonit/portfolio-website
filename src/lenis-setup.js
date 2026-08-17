import Lenis from 'lenis'

let windowLenis
let animationFrame
let consumers = 0

const updateLenis = (time) => {
  windowLenis?.raf(time)
  animationFrame = window.requestAnimationFrame(updateLenis)
}

export function acquireWindowLenis() {
  consumers += 1

  if (!windowLenis) {
    windowLenis = new Lenis({
      duration: 1.15,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      syncTouch: false,
    })
    animationFrame = window.requestAnimationFrame(updateLenis)
  }

  return windowLenis
}

export function releaseWindowLenis() {
  consumers = Math.max(0, consumers - 1)
  if (consumers > 0 || !windowLenis) return

  window.cancelAnimationFrame(animationFrame)
  windowLenis.destroy()
  windowLenis = undefined
  animationFrame = undefined
}
