import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <div style={{ paddingTop: '5rem', maxWidth: 380 }}>
          <p
            style={{
              fontFamily: 'var(--fc)',
              fontSize: '.68rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--ink-f)',
              marginBottom: '1rem',
            }}
          >
            404
          </p>
          <h1 className="page__title" style={{ marginBottom: '.75rem' }}>
            Page not found.
          </h1>
          <p style={{ color: 'var(--ink-m)', marginBottom: '2rem' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="secondary">← Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
