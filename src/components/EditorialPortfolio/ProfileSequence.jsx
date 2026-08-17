import { capabilityGroups } from '../../data/portfolio.js'
import Reveal from './Reveal.jsx'

function About() {
  return (
    <Reveal as="section" className="about-card" aria-labelledby="about-card-title">
      <span className="about-card__label">About</span>
      <h3 id="about-card-title">
        I&apos;m a software engineer who <span>turns complex ideas into clear products.</span>
        {' '}I focus on responsive interfaces, dependable systems and careful execution.
      </h3>
      <div className="about-card__foot">
        <p>
          I study Information Systems at the University of The Gambia and build with React,
          JavaScript, Java and MySQL.
        </p>
        <a href="#projects">View project</a>
      </div>
    </Reveal>
  )
}

function Capabilities() {
  return (
    <Reveal as="section" className="capabilities-card" aria-labelledby="capabilities-title">
      <span className="capabilities-card__label">Capabilities</span>
      <div className="capabilities-card__layout">
        <div className="capabilities-card__number" aria-hidden="true">01</div>
        <div className="capabilities-card__body">
          <h3 id="capabilities-title">Product &amp; Interface</h3>
          <p>Building digital work that is useful, responsive and ready to grow.</p>

          <div className="capability-groups">
            {capabilityGroups.map((group) => (
              <div className="capability-group" key={group[0]}>
                {group.map((item) => <span key={item}>{item}</span>)}
              </div>
            ))}
          </div>
        </div>
        <figure className="capabilities-card__image">
          <img
            src={`${import.meta.env.BASE_URL}assets/editorial/capabilities-object.png`}
            alt="Black metal sculpture with three circular openings"
            loading="lazy"
          />
        </figure>
      </div>
    </Reveal>
  )
}

function ProfileSequence() {
  return (
    <section className="profile-sequence" id="about" aria-labelledby="profile-title">
      <div className="profile-sequence__ghost" aria-hidden="true">ALHAGIE</div>
      <Reveal as="header" className="profile-sequence__heading">
        <div>
          <span className="section-kicker">04 / About</span>
          <h2 id="profile-title">Engineer with intent</h2>
        </div>
        <p>Thoughtful interfaces, dependable foundations and a practical approach to every build.</p>
      </Reveal>
      <div className="profile-sequence__cards">
        <About />
        <Capabilities />
      </div>
    </section>
  )
}

export default ProfileSequence
