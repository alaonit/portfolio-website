import Hero from './components/EditorialPortfolio/Hero.jsx'
import Manifesto from './components/EditorialPortfolio/Manifesto.jsx'
import Work from './components/EditorialPortfolio/Work.jsx'
import Skills from './components/EditorialPortfolio/Skills.jsx'
import ProfileSequence from './components/EditorialPortfolio/ProfileSequence.jsx'
import Contact from './components/EditorialPortfolio/Contact.jsx'
import ScrollExperience from './components/EditorialPortfolio/ScrollExperience.jsx'
import './components/EditorialPortfolio/EditorialPortfolio.css'

function App() {
  return (
    <div className="site-shell">
      <ScrollExperience />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <Hero />
        <div className="dark-canvas">
          <Manifesto />
          <Work />
          <Skills />
          <ProfileSequence />
          <Contact />
        </div>
      </main>
    </div>
  )
}

export default App
