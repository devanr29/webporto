import { Link } from 'react-router-dom'
import ExperienceSection from '../components/sections/ExperienceSection'
import LessonsSection from '../components/sections/LessonsSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import Footer from '../components/sections/Footer'
import useScrollReveal from '../hooks/useScrollReveal'

const SKILLS = {
  Networking: ['F5 BIG-IP LTM', 'F5 BIG-IP GTM', 'DNS', 'SSL/TLS', 'Load Balancing', 'High Availability'],
  Automation: ['Python', 'Flask', 'Docker', 'Git', 'REST APIs', 'Webhooks', 'SQLite'],
  'ML & Data': ['scikit-learn', 'Transformers (BERT)', 'NLTK', 'Machine Learning', 'IoT Sensors', 'Firebase'],
}

// Cycle the three existing skill-tag color classes by category position
const SKILL_COLORS = ['frontend', 'backend', 'tools']

const STATS = [
  { num: '24/7', label: 'Banking ops' },
  { num: '64', label: 'F5 hosts' },
  { num: '7+', label: 'Org roles led' },
]

// Photo hidden for now — flip back on once a real photo is ready
const SHOW_PHOTO = false

export default function Professional() {
  useScrollReveal()

  return (
    <>
      <header className="container" style={{ paddingTop: '9rem' }}>
        <div className="reveal">
          <Link to="/" className="sq-link" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
            ← Back to personal site
          </Link>
          <span className="section-label">The Professional Side</span>
          <h2 className="section-heading" style={{ marginBottom: '1rem' }}>
            The career, <span className="highlight">in detail</span>
          </h2>
          <p className="about__bio" style={{ maxWidth: '620px' }}>
            The rest of this site is who I am and what I build for fun. This page is the
            formal version — where I&apos;ve worked, what I&apos;ve led, and the résumé to match.
          </p>
        </div>
      </header>

      <section className="section about" id="about">
        <div className="container">
          <div className={`about__grid${SHOW_PHOTO ? '' : ' about__grid--no-photo'}`}>
            {SHOW_PHOTO && (
              <div className="reveal reveal--left">
                <div className="about__photo">
                  <div className="about__photo-frame">
                    👤
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="reveal">
                <span className="section-label">About Me</span>
                <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
Keeping systems up,<br />
                  building <span className="highlight">what&apos;s next</span>
                </h2>
                <p className="about__bio">
                  I&apos;m a Network Engineer keeping business-critical banking infrastructure
                  online — configuring and troubleshooting F5 BIG-IP across 64 hosts and running
                  independent 24/7 shifts. I joined with zero prior F5 experience and was operating
                  production solo within two weeks; learning fast under real pressure is kind of my thing.
                </p>
                <p className="about__bio">
                  Off the clock, I build. I write Python automation that turns multi-day tasks into
                  minutes, and I tinker with AI assistants, NLP, and IoT + machine-learning projects.
                  Deliberate by nature, curious without limit — that&apos;s how I approach both the
                  network and the code.
                </p>
              </div>

              <div className="about__stats reveal reveal-delay-2">
                {STATS.map((s) => (
                  <div key={s.label} className="about__stat">
                    <div className="about__stat-num">{s.num}</div>
                    <div className="about__stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="reveal reveal-delay-3">
                <p className="about__skills-heading">Skills &amp; Technologies</p>
                {Object.entries(SKILLS).map(([category, tags], idx) => (
                  <div key={category} className="about__skills-group">
                    <p className="about__skills-category">{category}</p>
                    <div className="about__skills-tags">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className={`skill-tag skill-tag--${SKILL_COLORS[idx % SKILL_COLORS.length]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExperienceSection />

      <LessonsSection />

      <ProjectsSection />

      <section className="container" style={{ paddingBottom: '7rem' }}>
        <div className="reveal" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1rem',
          padding: '2.5rem',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--line)',
        }}>
          <h3 style={{ fontFamily: 'var(--fh)', fontSize: '1.3rem', fontWeight: 700 }}>
            Prefer the formal version?
          </h3>
          <p style={{ color: 'var(--ink-m)', maxWidth: '520px' }}>
            Here&apos;s my CV — the same story, condensed onto a page.
          </p>
          <a className="btn btn--secondary" href="/cv.pdf" download="Devan Ramadhana CV.pdf">
            Download CV
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}
