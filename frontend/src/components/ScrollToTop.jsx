import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Resets scroll to the top of the page on every route change. Without this,
// React Router preserves the previous scroll offset, so navigating from a
// scrolled-down section (e.g. Side Quest) lands mid-page on the next route.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
