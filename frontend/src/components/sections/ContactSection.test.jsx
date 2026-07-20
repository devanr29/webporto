import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactSection from './ContactSection'

async function fillForm(user) {
  await user.type(screen.getByLabelText(/name/i), 'Jane Doe')
  await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
  await user.type(screen.getByLabelText(/message/i), 'Hello there')
}

function mockResponse(ok, body = { ok }) {
  return { ok, status: ok ? 200 : 400, json: async () => body }
}

describe('ContactSection', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse(true)))
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('shows the contact form by default', () => {
    render(<ContactSection />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled()
  })

  it('disables the submit button and shows a sending state while the message is in flight', async () => {
    let resolveFetch
    fetch.mockReturnValue(new Promise((resolve) => { resolveFetch = resolve }))
    const user = userEvent.setup()
    render(<ContactSection />)
    await fillForm(user)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()

    resolveFetch(mockResponse(true))
    await screen.findByText(/message sent/i, {}, { timeout: 3000 })
  }, 10000)

  it('shows a success message and clears the form once the message is sent', async () => {
    const user = userEvent.setup()
    render(<ContactSection />)
    await fillForm(user)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/message sent/i, {}, { timeout: 3000 })).toBeInTheDocument()
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
  }, 10000)

  it('returns to an empty form when "Send Another" is clicked', async () => {
    const user = userEvent.setup()
    render(<ContactSection />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await screen.findByText(/message sent/i, {}, { timeout: 3000 })

    await user.click(screen.getByRole('button', { name: /send another/i }))

    expect(screen.getByLabelText(/name/i)).toHaveValue('')
  }, 10000)

  it('shows an error and keeps the form filled when the request fails', async () => {
    fetch.mockResolvedValue(mockResponse(false, { errors: [{ message: 'Invalid email' }] }))
    const user = userEvent.setup()
    render(<ContactSection />)
    await fillForm(user)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toHaveValue('Jane Doe')
  }, 10000)
})
