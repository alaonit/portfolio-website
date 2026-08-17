import Reveal from './Reveal.jsx'

function Manifesto() {
  return (
    <section className="manifesto" id="approach" aria-labelledby="manifesto-title">
      <div className="manifesto__ghost" aria-hidden="true">ALHAGIE</div>

      <Reveal className="manifesto__panel">
        <span className="manifesto__label">Approach / 01</span>
        <h2 id="manifesto-title">
          Thoughtful digital products <span>with taste, clarity and intent.</span>
        </h2>
        <div className="manifesto__meta">
          <span>Software engineering</span>
          <span>Interface development</span>
        </div>
      </Reveal>

      <div className="manifesto__signature" aria-hidden="true">
        <span className="manifesto__mark">A</span>
        <span>Digital portfolio</span>
      </div>
    </section>
  )
}

export default Manifesto
