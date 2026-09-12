import { FaJava } from 'react-icons/fa6'
import { SiJavascript, SiMysql, SiReact } from 'react-icons/si'
import { skillIndex } from '../../data/portfolio.js'
import Reveal from './Reveal.jsx'
import ScrollStack, { ScrollStackItem } from '../ScrollStack/ScrollStack.jsx'

const skillVisuals = {
  JavaScript: { icon: SiJavascript, color: '#f7df1e' },
  React: { icon: SiReact, color: '#61dafb' },
  Java: { icon: FaJava, color: '#f89820' },
  MySQL: { icon: SiMysql, color: '#4479a1' },
}

function Skills() {
  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-title">
      <Reveal className="skills-section__header">
        <div className="skills-section__title-block">
          <span className="section-kicker">03 / Teck Stack</span>
          <h2 id="skills-title" data-scroll-text>Teck Stack</h2>
        </div>
        <p>Core technologies I use to design, build and structure digital products.</p>
      </Reveal>

      <ScrollStack>
        {skillIndex.map((skill, index) => {
          const visual = skillVisuals[skill.name]
          const SkillIcon = visual.icon

          return (
            <ScrollStackItem
              className="skill-card"
              key={skill.name}
              style={{ '--skill-color': visual.color }}
            >
              <div className="skill-card__meta">
                <span className="skill-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="skill-card__use">{skill.use}</span>
              </div>

              <div className="skill-card__icon" aria-hidden="true">
                <SkillIcon />
              </div>

              <div className="skill-card__copy">
                <h3>{skill.name}</h3>
                <p>{skill.focus}</p>
              </div>
            </ScrollStackItem>
          )
        })}
      </ScrollStack>
    </section>
  )
}

export default Skills
