import { useState } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT
const DEBUG_TAG = '[ContactForm]'

// In a production build (the deployed Vercel site), submit through our own
// /api/contact serverless function instead of hitting Formspree directly.
// That function logs the request and Formspree's response server-side, so
// they show up in `vercel logs` / the Functions tab — not just the visitor's
// browser console. `vite dev` doesn't run Vercel functions, so dev keeps
// posting straight to Formspree with the client-side logging below.
const USE_SERVER_PROXY = import.meta.env.PROD

// Runs once per page load, in both `vite dev` and the deployed Vercel build —
// open DevTools > Console on either to see it. Catches the classic "forgot to
// set the env var on Vercel" case, which otherwise fails silently.
if (!USE_SERVER_PROXY && !FORMSPREE_ENDPOINT) {
  console.error(
    `${DEBUG_TAG} VITE_FORMSPREE_ENDPOINT is not set — submissions will fail. ` +
    `Set it in frontend/.env (dev).`,
    { mode: import.meta.env.MODE }
  )
} else if (USE_SERVER_PROXY) {
  console.log(`${DEBUG_TAG} Submitting via /api/contact (server-side logs in Vercel).`, { mode: import.meta.env.MODE })
} else {
  console.log(`${DEBUG_TAG} Formspree endpoint configured:`, FORMSPREE_ENDPOINT, { mode: import.meta.env.MODE })
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  useScrollReveal()

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!USE_SERVER_PROXY && !FORMSPREE_ENDPOINT) {
      console.error(`${DEBUG_TAG} Aborting submit — no endpoint configured.`)
      setError('Contact form is misconfigured — please email me directly at devanr2911@gmail.com')
      setLoading(false)
      return
    }

    console.log(`${DEBUG_TAG} Submitting…`, { name: form.name, email: form.email, messageLength: form.message.length })

    try {
      const res = USE_SERVER_PROXY
        ? await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
          })
        : await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(e.target),
          })
      const body = await res.json().catch(() => null)
      console.log(`${DEBUG_TAG} Response`, { status: res.status, ok: res.ok, body })

      if (!res.ok) throw new Error(body?.errors?.map((er) => er.message).join(', ') || 'Request failed')

      // A 200/ok here only means Formspree accepted the submission — it does
      // NOT guarantee an email lands in the inbox. Formspree's spam filter
      // (Formshield) can silently route accepted submissions to the form's
      // Spam tab instead of sending a notification. Check
      // https://formspree.io/forms/<id>/submissions if messages "go missing".
      // In production, also check the Vercel deployment's Functions logs for
      // the [api/contact] entries logged server-side.
      console.log(`${DEBUG_TAG} Accepted. If no email arrives, check the Spam tab in the Formspree dashboard${USE_SERVER_PROXY ? ' and the Vercel Functions logs' : ''}.`)

      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(`${DEBUG_TAG} Submit failed`, err)
      setError("Something went wrong — please email me directly at devanr2911@gmail.com")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div>
            <div className="reveal">
              <span className="section-label">Say Hello</span>
              <h2 className="contact__heading">
                Let&apos;s have a<br />
                <span className="highlight">conversation.</span>
              </h2>
              <p className="contact__sub">
                Whether you want to talk about a project, share an idea, or simply
                get to know each other — I&apos;d love to hear from you.
                My inbox is always open.
              </p>
            </div>

            <div className="contact__info reveal reveal-delay-1">
              <div className="contact__info-item">
                <div className="contact__info-icon">📧</div>
                <div>
                  <div className="contact__info-label">Email</div>
                  <div className="contact__info-value">devanr2911@gmail.com</div>
                </div>
              </div>
              <div className="contact__info-item">
                <div className="contact__info-icon">📍</div>
                <div>
                  <div className="contact__info-label">Based in</div>
                  <div className="contact__info-value">Jakarta / Bandung, Indonesia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            {sent ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: '1rem',
                padding: '3rem',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--line)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '3rem' }}>🎉</div>
                <h3 style={{ fontFamily: 'var(--fh)', fontSize: '1.4rem', fontWeight: 700 }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--ink-m)' }}>
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button className="btn btn--outline-accent" onClick={() => setSent(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell me about your project, role, or anything on your mind..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && (
                  <p style={{ color: 'var(--accent, #c0392b)', fontSize: '.9rem' }}>{error}</p>
                )}
                <div className="contact__submit">
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span style={{
                          width: 14, height: 14,
                          border: '2px solid rgba(255,255,255,.4)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          display: 'inline-block',
                          animation: 'spin .6s linear infinite',
                        }} />
                        Sending…
                      </>
                    ) : (
                      <>Send Message →</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
