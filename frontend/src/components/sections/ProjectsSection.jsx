import { useState, useRef, useEffect } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'

const GITHUB_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const LIVE_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ARTICLE_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </svg>
)

const LINK_META = {
  github: { label: 'GitHub', icon: GITHUB_ICON },
  live: { label: 'Live', icon: LIVE_ICON },
  article: { label: 'Article', icon: ARTICLE_ICON },
}

const PROJECTS = [
  {
    emoji: '💬',
    bg: '#DFF0E8',                 /* forest green tint */
    title: 'WhatsApp AI Personal Assistant',
    desc: 'Self-hosted bot with a two-stage AI pipeline: a fast intent classifier (26 intents) routes to modules while Gemini handles fallback and creative tasks. RAG-style semantic memory via vector embeddings in SQLite, bilingual support, and full Google Calendar/Tasks/Sheets integration over a webhook architecture.',
    tags: ['Python', 'Flask', 'Groq (LLaMA 3.1)', 'Gemini', 'SQLite', 'Docker', 'Green API'],
    categories: ['ai'],
    links: [
      { type: 'github', href: 'https://github.com/archsaber29as/chatbotwav2' },
    ],
  },
  {
    emoji: '🎬',
    bg: '#F5E8DF',                 /* terracotta tint */
    title: 'Sentiment Analysis on IMDb Reviews',
    desc: 'Scraped 1,000+ film & series reviews from IMDb with Selenium and BeautifulSoup, then progressed from an NLTK baseline to a fine-tuned BERT model reaching 92% classification accuracy — surfacing audience sentiment trends across the dataset.',
    tags: ['Python', 'NLTK', 'BeautifulSoup', 'Selenium', 'scikit-learn', 'BERT'],
    categories: ['ai'],
    links: [
      { type: 'live', href: 'https://sentimentforimdb.vercel.app/' },
      { type: 'article', href: 'https://medium.com/@devanr2911/sentiment-analysis-of-movie-reviews-using-bert-a-full-stack-portfolio-project-a4edcc475380' },
    ],
  },
  {
    emoji: '🐐',
    bg: '#F5EDD4',                 /* amber tint */
    title: 'GoatGuard — Innovillage 2023',
    desc: 'An IoT device integrated with machine learning for early disease detection in goats — monitoring temperature, heart rate, and oxygen saturation, then flagging likely diseases from abnormal readings. Recognized as a Top 163 team and awarded funding at Innovillage 2023.',
    tags: ['Python', 'Machine Learning', 'IoT Sensors'],
    categories: ['iot'],
    links: [
      { type: 'github', href: 'https://github.com/devanr29/Kambing' },
    ],
  },
  {
    emoji: '🐟',
    bg: '#EDE8DC',                 /* warm sand */
    title: 'MyIpond — Catfish Pond Water Quality',
    desc: 'A water-quality monitoring system for catfish ponds that measures temperature, turbidity, and pH via IoT sensors, then uses machine learning to analyze how water conditions affect catfish health and growth — enabling better pond management and productivity.',
    tags: ['Python', 'scikit-learn', 'IoT Sensors', 'Firebase RTDB', 'Machine Learning'],
    categories: ['iot'],
    links: [
      { type: 'live', href: 'https://myi-pond.vercel.app/' },
    ],
  },
  {
    emoji: '🐉',
    bg: '#E7E4D8',                 /* sage-sand tint */
    title: 'Analyzing House of the Dragon Reviews with NLTK',
    desc: "Scraped 200+ IMDb user reviews of House of the Dragon Season 2 and scored them with NLTK's VADER sentiment analyzer, then used POS-based features to examine which reviews readers found most helpful — negative and concise reviews came out on top.",
    tags: ['Python', 'Selenium', 'BeautifulSoup', 'NLTK', 'pandas'],
    categories: ['ai'],
    links: [
      { type: 'article', href: 'https://medium.com/@devanr2911/analyzing-house-of-the-dragon-user-reviews-on-imdb-using-sentiment-analysis-with-nltk-1f5a6129b2ce' },
    ],
  },
  {
    emoji: '🎧',
    bg: '#EFE2D0',                 /* clay tint */
    title: 'Most Streamed Songs on Spotify',
    desc: "Exploratory analysis of 952 of Spotify's most-streamed songs of 2023, looking at release year, key/mode, danceability, energy, and top artists. Recent releases lead the streams, and upbeat major-key tracks show up the most.",
    tags: ['Excel', 'Data Visualization', 'Kaggle'],
    categories: ['data'],
    links: [
      { type: 'article', href: 'https://medium.com/@devanr2911/most-streamed-songs-on-spotify-99894e9ec717' },
    ],
  },
  {
    emoji: '📱',
    bg: '#DCE6DD',                 /* muted sage */
    title: 'Personal Mobile Apps — Productivity & Money Management',
    desc: 'A personal backend API behind my own productivity and money-management apps, covering tasks, scheduling, spending tracking, AI-assisted features, Google sign-in, and push notifications.',
    tags: ['Python', 'REST API', 'Google Auth', 'Push Notifications', 'SQL'],
    categories: ['apps'],
    links: [
      { type: 'github', href: 'https://github.com/devanr29/personalmobappsapi' },
    ],
  },
  {
    emoji: '🧭',
    bg: '#E5DED0',                 /* warm taupe */
    title: 'Codebase to Learn — Claude Skill for Vibe Coders',
    desc: "A Claude Code skill that walks vibe coders through a codebase they didn't write: what it does, how to run it, what each part is for, and how a feature flows through the files — built on an indexed, interactive HTML code map.",
    tags: ['Claude Code', 'Python', 'SQLite', 'Prompt Engineering'],
    categories: ['ai', 'apps'],
    links: [
      { type: 'github', href: 'https://github.com/devanr29/codebase-to-learn' },
    ],
  },
]

const FILTERS = ['All', 'AI', 'IoT', 'Data', 'Apps & Tools']
const FILTER_TO_CATEGORY = { AI: 'ai', IoT: 'iot', Data: 'data', 'Apps & Tools': 'apps' }

function ProjectCard({ project }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)'
    }
  }

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card__image">
        <div className="project-card__image-bg" style={{ background: project.bg }}>
          {project.emoji}
        </div>
        <div className="project-card__overlay">
          {project.links.map((link) => {
            const meta = LINK_META[link.type]
            return (
              <a
                key={link.type}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="project-card__overlay-btn"
                aria-label={`${meta.label} — ${project.title}`}
              >
                {meta.icon}
                {meta.label}
              </a>
            )
          })}
        </div>
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__tags">
          {project.tags.map((t) => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>
        <div className="project-card__links">
          {project.links.map((link) => {
            const meta = LINK_META[link.type]
            return (
              <a
                key={link.type}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="project-card__link"
                aria-label={`${meta.label} — ${project.title}`}
              >
                {meta.label} ↗
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  // Re-scan for `.reveal` elements whenever the filter changes: filtered-out
  // cards unmount, and switching back remounts them as new DOM nodes that
  // the original observer never saw.
  useScrollReveal('.reveal', [activeFilter])

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categories.includes(FILTER_TO_CATEGORY[activeFilter]))

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Portfolio</span>
          <h2 className="section-heading">
            Things I&apos;ve <span className="highlight">built</span>
          </h2>
        </div>

        <div className="projects__filters reveal reveal-delay-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? ' filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filtered.map((project, i) => (
            <div key={project.title} className={`reveal reveal-delay-${(i % 3) + 1}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
