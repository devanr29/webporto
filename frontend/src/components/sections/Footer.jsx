import { Link, useLocation } from 'react-router-dom'

const LINKS = ['About', 'Side Quest', 'Projects', 'Contact']

export default function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const scrollTo = (id) => {
    document.querySelector(`#${id.toLowerCase().replace(/\s+/g, '')}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <Link to="/" className="footer__logo">DR<span>.</span></Link>
          <div className="footer__links">
            {LINKS.map((l) => (
              isHome ? (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s+/g, '')}`}
                  className="footer__link"
                  onClick={(e) => { e.preventDefault(); scrollTo(l) }}
                >
                  {l}
                </a>
              ) : (
                <Link key={l} to="/" className="footer__link">{l}</Link>
              )
            ))}
            {isHome && (
              <Link to="/professional" className="footer__link">Professional</Link>
            )}
          </div>
          <span className="footer__copy">© {new Date().getFullYear()} Devan Ramadhana. Built with React.</span>
        </div>
      </div>
    </footer>
  )
}
