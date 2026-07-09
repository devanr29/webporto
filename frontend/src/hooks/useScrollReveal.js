import { useEffect } from 'react'

// `deps` lets callers force a re-scan when their `.reveal` elements can be
// unmounted and remounted as new DOM nodes (e.g. a filtered list) — those
// nodes were never observed by the original IntersectionObserver and would
// otherwise stay stuck at their pre-reveal (invisible) state forever.
export default function useScrollReveal(selector = '.reveal', deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps])
}
