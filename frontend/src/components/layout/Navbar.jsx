import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

const HOME_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Side Quest', href: '#sidequest' },
  { label: 'Contact', href: '#contact' },
]

const PROFESSIONAL_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Lessons', href: '#lessons' },
  { label: 'Projects', href: '#projects' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const navLinks = isHome ? HOME_LINKS : PROFESSIONAL_LINKS

  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setActiveSection('')
    const sections = navLinks.map((l) => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      // Thin band near viewport middle, not a %-of-target ratio — a ratio threshold like 0.4
      // never fires for sections taller than ~2.5x the viewport (e.g. the Experience timeline).
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [pathname])

  const scrollTo = useCallback((href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Non-home variant (e.g. /professional) — same section-nav pattern, no CTA button
  if (!isHome) {
    return (
      <>
        <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
          <Link to="/" className="navbar__logo">
            DR<span>.</span>
          </Link>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`navbar__link${activeSection === link.href ? ' navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              >
                {link.label}
              </a>
            ))}
            <Link to="/" className="navbar__link">
              ← Personal site
            </Link>
          </div>

          <button
            className={`navbar__hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>

        <div className={`navbar__mobile${mobileOpen ? ' open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link${activeSection === link.href ? ' navbar__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
            >
              {link.label}
            </a>
          ))}
          <Link to="/" className="navbar__link" onClick={() => setMobileOpen(false)}>
            ← Personal site
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <a
          href="#"
          className="navbar__logo"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          DR<span>.</span>
        </a>

        <div className="navbar__links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link${activeSection === link.href ? ' navbar__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
            >
              {link.label}
            </a>
          ))}
          <Link to="/professional" className="navbar__link">
            Professional
          </Link>
        </div>

        <button
          className="navbar__cta"
          onClick={() => scrollTo('#contact')}
        >
          Say hi
        </button>

        <button
          className={`navbar__hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`navbar__mobile${mobileOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`navbar__link${activeSection === link.href ? ' navbar__link--active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
          >
            {link.label}
          </a>
        ))}
        <Link to="/professional" className="navbar__link" onClick={() => setMobileOpen(false)}>
          Professional
        </Link>
        <button className="btn btn--primary" onClick={() => scrollTo('#contact')}>
          Say hi
        </button>
      </div>
    </>
  )
}
