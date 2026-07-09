import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectsSection from './ProjectsSection'

// Simulates every observed element already being in the viewport, so the
// reveal callback fires the moment an element is (re-)observed — this is what
// exposes the bug: elements that are never re-observed after a filter change
// never get marked visible, no matter how "in view" they actually are.
class AutoRevealObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe(el) {
    this.callback([{ isIntersecting: true, target: el }])
  }
  unobserve() {}
  disconnect() {}
}

function revealWrapper(title) {
  return screen.getByText(title).closest('.reveal')
}

describe('ProjectsSection filter tabs', () => {
  beforeEach(() => {
    globalThis.IntersectionObserver = AutoRevealObserver
  })

  afterEach(() => {
    cleanup()
  })

  it('reveals every project on initial mount', () => {
    render(<ProjectsSection />)

    expect(revealWrapper('WhatsApp AI Personal Assistant')).toHaveClass('visible')
    expect(revealWrapper('GoatGuard — Innovillage 2023')).toHaveClass('visible')
  })

  it('reveals cards for a category that was previously filtered out and remounted', async () => {
    const user = userEvent.setup()
    render(<ProjectsSection />)

    // Filtering to AI unmounts the IoT-only cards (GoatGuard, MyIpond).
    await user.click(screen.getByRole('button', { name: 'AI' }))

    // Filtering to IoT remounts GoatGuard/MyIpond as brand-new DOM nodes —
    // they must still end up revealed, not stuck invisible forever.
    await user.click(screen.getByRole('button', { name: 'IoT' }))

    expect(revealWrapper('GoatGuard — Innovillage 2023')).toHaveClass('visible')
    expect(revealWrapper('MyIpond — Catfish Pond Water Quality')).toHaveClass('visible')
  })
})
