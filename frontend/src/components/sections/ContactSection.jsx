import { useState } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  useScrollReveal()

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
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
