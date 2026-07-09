import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../../hooks/useScrollReveal'

const WRITING_POSTS = [
  { title: 'Sentiment Analysis of Movie Reviews using BERT — A Full Stack Portfolio Project', platform: 'Medium' },
  { title: 'Analyzing House of the Dragon Reviews on IMDb with Sentiment Analysis (NLTK)', platform: 'Medium' },
  { title: 'Most Streamed Songs on Spotify', platform: 'Medium' },
  { title: 'Predicting Air Quality with Machine Learning', platform: 'Medium' },
]

const BOOKS = [
  {
    title: 'Tuesdays with Morrie',
    author: 'Mitch Albom',
    rating: 9,
    ratingMax: 10,
    quote: 'Love each other or perish.',
    takeaways: [
      'Success means little without meaningful relationships.',
      'Time is limited, making every moment valuable.',
      'Vulnerability and empathy are strengths, not weaknesses.',
      'Accepting mortality helps clarify what truly matters.',
      'A fulfilling life is built on love, purpose, and connection.',
    ],
    resonates: [
      'Reminds me to balance career ambitions with personal relationships.',
      'Encourages reflection on what defines a meaningful life.',
      'Highlights the importance of continuous learning from others.',
      'Reinforces gratitude for everyday experiences.',
    ],
    impact: [
      'Encouraged me to think beyond professional achievements.',
      'Inspired more intentional relationships with family and friends.',
      'Changed how I define success and fulfillment.',
    ],
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    rating: 8.5,
    ratingMax: 10,
    quote: "The rich don't work for money. They make money work for them.",
    takeaways: [
      'Financial education is as important as formal education.',
      'Assets generate wealth; liabilities consume it.',
      'Working for money differs from making money work for you.',
      'Long-term financial freedom requires strategic thinking.',
      'Building multiple income streams creates resilience.',
    ],
    resonates: [
      'Aligns with my goal of achieving financial independence at a young age.',
      'Encourages developing skills beyond technical expertise.',
      'Reinforces the importance of investing in knowledge and opportunities.',
      'Changed how I think about income, savings, and wealth creation.',
    ],
    impact: [
      'Sparked a stronger interest in personal finance and investing.',
      'Shifted my focus from earning income to building assets.',
      'Encouraged a long-term perspective on career and wealth.',
    ],
  },
  {
    title: 'Meditations',
    author: 'Marcus Aurelius',
    rating: 9.5,
    ratingMax: 10,
    quote: 'You have power over your mind—not outside events.',
    takeaways: [
      'Focus on what you can control and accept what you cannot.',
      'External events are less important than your response to them.',
      'Discipline, virtue, and character are within your control.',
      'Obstacles can become opportunities for growth.',
      'A meaningful life is built through daily actions and self-reflection.',
    ],
    resonates: [
      'Provides a practical framework for handling uncertainty and pressure.',
      'Helps maintain perspective during career challenges and setbacks.',
      'Encourages emotional resilience and self-discipline.',
      'Complements my focus on continuous improvement and personal growth.',
    ],
    impact: [
      'Improved my approach to stress, setbacks, and uncertainty.',
      'Encouraged greater self-awareness and accountability.',
      'Influenced how I approach challenges in both work and life.',
    ],
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 9,
    ratingMax: 10,
    quote: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    takeaways: [
      'Small improvements compound into significant results over time.',
      'Systems and routines matter more than goals alone.',
      'Environment design can make good habits easier to maintain.',
      'Consistency beats motivation for long-term success.',
      'Identity-based habits help create lasting behavioral change.',
    ],
    resonates: [
      'Reinforced my belief that continuous learning is built through daily practice.',
      'Applies to both technical growth and personal development.',
      'Reminds me to focus on sustainable progress rather than quick wins.',
      'Encourages building systems that support long-term career goals.',
    ],
    impact: [
      'Changed how I approach learning new technologies and skills.',
      'Helped me prioritize habits and routines over short-term motivation.',
      'Influenced the way I think about personal and professional growth.',
    ],
  },
]

// Instagram posts to feature in the Song Reviews card.
// Paste full post/reel permalinks from @fromalistener, e.g.
//   'https://www.instagram.com/p/ABC123xyz/'
//   'https://www.instagram.com/reel/DEF456uvw/'
// Until this list has entries, the card renders as plain text + profile link.
const SONG_REVIEW_POSTS = [
  'https://www.instagram.com/p/DTnaaC_ktBg/',
  'https://www.instagram.com/p/DVJAVYeEilG/',
]

// Loads Instagram's official embed script once, then (re)renders any
// `.instagram-media` blockquotes currently on the page.
function processInstagramEmbeds() {
  const render = () => window.instgrm?.Embeds?.process()
  if (window.instgrm?.Embeds) {
    render()
    return
  }
  let script = document.getElementById('instagram-embed-script')
  if (!script) {
    script = document.createElement('script')
    script.id = 'instagram-embed-script'
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }
  script.addEventListener('load', render, { once: true })
}

export default function SideQuestSection() {
  useScrollReveal()
  const [openBook, setOpenBook] = useState(null)

  useEffect(() => {
    if (SONG_REVIEW_POSTS.length > 0) processInstagramEmbeds()
  }, [])

  return (
    <section className="section sidequest" id="sidequest">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Side Quest</span>
          <h2 className="section-heading">
            Life <span className="highlight">beyond</span> the code
          </h2>
          <p className="sidequest__intro">
            I believe the best engineers are curious humans first.
            Here&apos;s what keeps me grounded, inspired, and sane.
          </p>
        </div>

        <div className="sidequest__grid">

          {/* Writing */}
          <div className="sq-card reveal reveal-delay-1">
            <div className="sq-card__icon-wrap sq-card__icon-wrap--terracotta">
              <span className="sq-card__icon">✍️</span>
            </div>
            <div className="sq-card__body">
              <h3 className="sq-card__title">Writing</h3>
              <p className="sq-card__desc">
                I write about machine learning, data projects, and what I learn building things.
                Long-form thoughts and project write-ups land on Medium.
              </p>
              <ul className="sq-posts">
                {WRITING_POSTS.map((p) => (
                  <li key={p.title} className="sq-post">
                    <span className="sq-post__dot" />
                    <span className="sq-post__title">{p.title}</span>
                    <span className={`sq-post__badge sq-post__badge--${p.platform.toLowerCase()}`}>
                      {p.platform}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="sq-card__links">
                <a href="https://medium.com/@devanr2911" target="_blank" rel="noreferrer" className="sq-link">
                  Medium ↗
                </a>
              </div>
            </div>
          </div>

          {/* Reading */}
          <div className="sq-card reveal reveal-delay-2">
            <div className="sq-card__icon-wrap sq-card__icon-wrap--amber">
              <span className="sq-card__icon">📚</span>
            </div>
            <div className="sq-card__body">
              <h3 className="sq-card__title">Reading</h3>
              <p className="sq-card__desc">
                From software craft to behavioral science — books are how I think slower and better.
              </p>
              <ul className="sq-books">
                {BOOKS.map((b, i) => {
                  const isOpen = openBook === i
                  return (
                    <li key={b.title} className={`sq-book${isOpen ? ' sq-book--open' : ''}`}>
                      <button
                        type="button"
                        className="sq-book__header"
                        aria-expanded={isOpen}
                        onClick={() => setOpenBook(isOpen ? null : i)}
                      >
                        <div className="sq-book__info">
                          <span className="sq-book__title">{b.title}</span>
                          <span className="sq-book__author">{b.author}</span>
                        </div>
                        <div className="sq-book__meta">
                          <span className="sq-book__rating">★ {b.rating}/{b.ratingMax}</span>
                          <span className="sq-book__chevron">{isOpen ? '−' : '+'}</span>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="sq-book__details">
                          <blockquote className="sq-book__quote">&ldquo;{b.quote}&rdquo;</blockquote>

                          <div className="sq-book__section">
                            <span className="sq-book__label">Key Takeaways</span>
                            <ul className="sq-book__list">
                              {b.takeaways.map((t) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="sq-book__section">
                            <span className="sq-book__label">Why It Resonates</span>
                            <ul className="sq-book__list">
                              {b.resonates.map((t) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="sq-book__section">
                            <span className="sq-book__label">Impact</span>
                            <ul className="sq-book__list">
                              {b.impact.map((t) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Song Reviews */}
          <div className="sq-card reveal reveal-delay-3">
            <div className="sq-card__icon-wrap sq-card__icon-wrap--green">
              <span className="sq-card__icon">🎵</span>
            </div>
            <div className="sq-card__body">
              <h3 className="sq-card__title">Song Reviews</h3>
              <p className="sq-card__desc">
                Music is more than background noise for me — I review songs and share what
                makes them tick over at <strong>@fromalistener</strong> on Instagram.
                It&apos;s where the listener in me does the talking.
              </p>

              {SONG_REVIEW_POSTS.length > 0 && (
                <div className="sq-ig">
                  {SONG_REVIEW_POSTS.map((url, i) => (
                    <blockquote
                      key={url}
                      className="instagram-media sq-ig__item"
                      data-instgrm-permalink={url}
                      data-instgrm-version="14"
                    >
                      {/* Fallback shown only if Instagram's embed script is
                          blocked/unavailable — links to the specific post,
                          not the account. Replaced by the real card on load. */}
                      <a href={url} target="_blank" rel="noreferrer" className="sq-ig__fallback">
                        <span className="sq-ig__fallback-icon">🎵</span>
                        View song review #{i + 1} on Instagram ↗
                      </a>
                    </blockquote>
                  ))}
                </div>
              )}

              <div className="sq-card__links">
                <a href="https://www.instagram.com/fromalistener" target="_blank" rel="noreferrer" className="sq-link">
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>

          {/* Professional — routes to /professional */}
          <Link to="/professional" className="sq-card sq-card--link reveal reveal-delay-4">
            <div className="sq-card__icon-wrap sq-card__icon-wrap--terracotta">
              <span className="sq-card__icon">💼</span>
            </div>
            <div className="sq-card__body">
              <h3 className="sq-card__title">Professional</h3>
              <p className="sq-card__desc">
                Curious about the day job? See the work, experience, and lessons behind
                the engineer — projects I&apos;ve shipped and the roles that shaped how I build.
              </p>
              <div className="sq-card__links">
                <span className="sq-link">View my professional side →</span>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  )
}
