import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactSection from './ContactSection'

async function fillForm(user) {
  await user.type(screen.getByLabelText(/name/i), 'Jane Doe')
  await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
  await user.type(screen.getByLabelText(/message/i), 'Hello there')
}

describe('ContactSection', () => {
  afterEach(() => {
    cleanup()
  })

  it('shows the contact form by default', () => {
    render(<ContactSection />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled()
  })

  it('disables the submit button and shows a sending state while the message is in flight', async () => {
    const user = userEvent.setup()
    render(<ContactSection />)
    await fillForm(user)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()

    // Let the pending submit resolve so its timer doesn't leak into the next test.
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
})
