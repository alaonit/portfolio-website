import { useRef, useState } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '../../data/portfolio.js'
import Reveal from './Reveal.jsx'

function Contact() {
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [statusTone, setStatusTone] = useState('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const statusRef = useRef(null)

  const clearFieldError = (field) => {
    if (!errors[field]) return
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const focusStatus = () => {
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting) return

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const honeypot = String(formData.get('_honey') ?? '').trim()
    const nextErrors = {}

    if (name.length < 2) nextErrors.name = 'Enter at least two characters.'
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.'
    if (message.length < 10) nextErrors.message = 'Write at least ten characters.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('Please correct the highlighted fields.')
      setStatusTone('error')
      requestAnimationFrame(() => form.querySelector('[aria-invalid="true"]')?.focus())
      return
    }

    if (honeypot) {
      form.reset()
      setErrors({})
      setStatus('Thanks. Your message has been received.')
      setStatusTone('success')
      return
    }

    if (!navigator.onLine) {
      setStatus('You appear to be offline. Check your connection and try again.')
      setStatusTone('error')
      focusStatus()
      return
    }

    setErrors({})
    setStatus('Sending your message…')
    setStatusTone('pending')
    setIsSubmitting(true)

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio enquiry from ${name}`,
          _template: 'table',
          _honey: honeypot,
        }),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok || result?.success === false || result?.success === 'false') {
        throw new Error('Form delivery failed')
      }

      form.reset()
      setStatus('Thanks. Your message has been sent successfully.')
      setStatusTone('success')
    } catch {
      setStatus('Your message could not be sent. Please try again or use the direct email link.')
      setStatusTone('error')
      focusStatus()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <Reveal className="contact__inner">
        <div className="contact__topline">
          <span>Direct project enquiries</span>
          <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>

        <div className="contact__intro">
          <span className="section-kicker contact__kicker">05 / Contact</span>
          <h2 id="contact-title" data-scroll-text>Let&apos;s build something useful.</h2>
          <p>Have a thoughtful product or engineering challenge in mind? Tell me about it.</p>
          <div className="contact__direct">
            <span>Direct email</span>
            <a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>

        <form
          className="contact-form"
          action={`https://formsubmit.co/${profile.email}`}
          method="POST"
          aria-busy={isSubmitting}
          onSubmit={handleSubmit}
          noValidate
        >
          <input type="hidden" name="_subject" value="New portfolio enquiry" />
          <input type="hidden" name="_template" value="table" />
          <div className="contact-form__honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="_honey"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="contact-form__header">
            <h3>Project enquiry</h3>
            <span>All fields required</span>
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-name"><span aria-hidden="true">01</span> Your name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength="80"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              onChange={() => clearFieldError('name')}
            />
            {errors.name && <span className="contact-form__error" id="contact-name-error">{errors.name}</span>}
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-email"><span aria-hidden="true">02</span> Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              maxLength="120"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              onChange={() => clearFieldError('email')}
            />
            {errors.email && <span className="contact-form__error" id="contact-email-error">{errors.email}</span>}
          </div>

          <div className="contact-form__field contact-form__field--message">
            <label htmlFor="contact-message"><span aria-hidden="true">03</span> Project details</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              required
              maxLength="1200"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              onChange={() => clearFieldError('message')}
            />
            {errors.message && <span className="contact-form__error" id="contact-message-error">{errors.message}</span>}
          </div>

          <div className="contact-form__actions">
            <button className="contact-form__submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span>
            </button>
            <p
              ref={statusRef}
              className="contact-form__status"
              data-state={statusTone}
              role={statusTone === 'error' ? 'alert' : 'status'}
              aria-live="polite"
              tabIndex={-1}
            >
              {status}
            </p>
          </div>
        </form>

        <div className="contact__meta">
          <strong>{profile.fullName}</strong>
          <span>{profile.rolePrimary} · {profile.roleSecondary}</span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <FaGithub className="contact__social-icon" aria-hidden="true" />
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedinIn className="contact__social-icon" aria-hidden="true" />
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <span>© 2026 {profile.firstName}</span>
        </div>
      </Reveal>
      <div className="contact__word" aria-hidden="true">ENGINEER</div>
    </footer>
  )
}

export default Contact
