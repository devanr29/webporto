import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import SideQuestSection from './SideQuestSection'

function renderSection() {
  return render(
    <MemoryRouter>
      <SideQuestSection />
    </MemoryRouter>
  )
}

describe('SideQuestSection book accordion', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders every book collapsed by default', () => {
    renderSection()
    const headers = screen.getAllByRole('button', { name: /★/ })
    expect(headers.length).toBeGreaterThan(0)
    headers.forEach((header) => {
      expect(header).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('expands a book\'s details when its header is clicked', async () => {
    const user = userEvent.setup()
    renderSection()

    const header = screen.getByRole('button', { name: /Tuesdays with Morrie/i })
    await user.click(header)

    expect(header).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Love each other or perish/i)).toBeInTheDocument()
  })

  it('collapses an expanded book when its header is clicked again', async () => {
    const user = userEvent.setup()
    renderSection()

    const header = screen.getByRole('button', { name: /Tuesdays with Morrie/i })
    await user.click(header)
    await user.click(header)

    expect(header).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/Love each other or perish/i)).not.toBeInTheDocument()
  })

  it('keeps only one book open at a time', async () => {
    const user = userEvent.setup()
    renderSection()

    const first = screen.getByRole('button', { name: /Tuesdays with Morrie/i })
    const second = screen.getByRole('button', { name: /Rich Dad Poor Dad/i })

    await user.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')

    await user.click(second)
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(first).toHaveAttribute('aria-expanded', 'false')
  })
})
