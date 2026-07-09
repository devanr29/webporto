import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

// Photo hidden for now — flip back on once a real photo is ready
const SHOW_AVATAR = false

function useScramble(finalText, delay = 400) {
  const [display, setDisplay] = useState(finalText)
  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0
      const len = finalText.length
      const interval = setInterval(() => {
        setDisplay(
          finalText
            .split('')
            .map((char, i) => {
              if (i < iteration) return finalText[i]
              if (char === ' ') return ' '
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        if (iteration >= len) clearInterval(interval)
        iteration += 0.4
      }, 35)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [finalText, delay])
  return display
}

export default function HeroSection() {
  const name = useScramble('Devan Ramadhana', 300)
  const shapesRef = useRef(null)

  useEffect(() => {
    let frameId
    const onScroll = () => {
      if (!shapesRef.current) return
      const y = window.scrollY
      const shapes = shapesRef.current.querySelectorAll('.hero__shape')
      shapes[0].style.transform = `translateY(${y * 0.15}px)`
      shapes[1].style.transform = `translateY(${y * 0.1}px)`
      shapes[2].style.transform = `translateY(${y * 0.25}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero__bg" ref={shapesRef}>
        <div className="hero__shape hero__shape--1" />
        <div className="hero__shape hero__shape--2" />
        <div className="hero__shape hero__shape--3" />
      </div>

      <div className="container">
        <div className="hero__grid">
          <div className="hero__content">
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-dot" />
              Based in Jakarta / Bandung, Indonesia
            </div>

            <h1 className="hero__heading">
              Hi, I&apos;m{' '}
              <span className="hero__heading-name">{name}</span>
              <br />
              Deliberate by nature.<br />Curious without limit.
            </h1>

            <p className="hero__subtitle">
              {/* TODO: first draft — refine as you see fit */}
              I move slowly on the things that matter and let curiosity pull me into
              everything else — reading to think clearer, writing to remember what I've
              learned, and taking things apart just to see how they work. I'd rather build
              something quietly and well than chase whatever's loudest.
            </p>

            <div className="hero__actions">
              <button
                className="btn btn--primary"
                onClick={() => scrollTo('#sidequest')}
              >
                View My Work ↓
              </button>
              <button
                className="btn btn--secondary"
                onClick={() => scrollTo('#about')}
              >
                Get to know me
              </button>
            </div>

            <div className="hero__socials">
              <a
                href="https://github.com/devanr29"
                target="_blank"
                rel="noreferrer"
                className="hero__social-link"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/devanrmdhna/"
                target="_blank"
                rel="noreferrer"
                className="hero__social-link"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:devanr2911@gmail.com"
                className="hero__social-link"
                aria-label="Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
              </a>
            </div>

            <div className="hero__scroll">
              <div className="hero__scroll-line" />
              Scroll
            </div>
          </div>

          {SHOW_AVATAR && (
            <div className="hero__avatar">
              <div className="hero__avatar-placeholder">
                👤
              </div>
              <div className="hero__avatar-badge">
                <span className="hero__avatar-badge-text">Network Engineer</span>
              </div>
              <div className="hero__avatar-card">
                <div className="hero__avatar-card-icon">🛡️</div>
                <div className="hero__avatar-card-info">
                  <span className="hero__avatar-card-num">64</span>
                  <span className="hero__avatar-card-label">F5 hosts kept online</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
