import { useState } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '../../data/portfolio.js'
import Reveal from './Reveal.jsx'

function Contact() {
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const clearFieldError = (field) => {
    if (!errors[field]) return
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const nextErrors = {}

    if (name.length < 2) nextErrors.name = 'Enter at least two characters.'
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.'
    if (message.length < 10) nextErrors.message = 'Write at least ten characters.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('Please correct the highlighted fields.')
      requestAnimationFrame(() => form.querySelector('[aria-invalid="true"]')?.focus())
      return
    }

    setErrors({})
    setStatus('Opening your email app with the message prepared.')

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
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
          <h2 id="contact-title">Let&apos;s build something useful.</h2>
          <p>Have a thoughtful product or engineering challenge in mind? Tell me about it.</p>
          <div className="contact__direct">
            <span>Direct email</span>
            <a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
            <button className="contact-form__submit" type="submit">
              Prepare email <span aria-hidden="true">↗</span>
            </button>
            <p className="contact-form__status" role="status" aria-live="polite">{status}</p>
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
