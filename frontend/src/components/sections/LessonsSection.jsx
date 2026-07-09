import { useState } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'

// One journey, told across four chapters and ordered oldest → latest.
// Each stop on the timeline carries a set of small moments — a titled lead-in
// and the story behind it — rather than flatly stated lessons.
const JOURNEY = [
  {
    role: 'PPA Jamadagni',
    company: 'Perhimpunan Penjelajah Alam Jamadagni',
    period: '2021 — 2024',
    moments: [
      {
        title: 'On being shaped while others were resting.',
        body: "While my high school friends were living their easiest years, I was in here, being tested and refined. I learned that comfort isn't something you wait for — it's something you build by leaving the one you already have.",
      },
      {
        title: 'On thinking clearly under real pressure.',
        body: "There's a program here called the expedition — our version of a thesis, run under the full weight of alumni and senior scrutiny. That pressure is where my critical thinking was actually forged, not just taught.",
      },
      {
        title: 'On making peace with failing.',
        body: "The older I get, the more I return to this: failure isn't a setback, it's a doorway. I stopped fearing it once I understood it was just learning wearing a different face.",
      },
      {
        title: 'On the sentence I said instead of complaining.',
        body: (
          <>
            I don&apos;t remember ever letting myself moan, even exhausted. Instead, I&apos;d
            tell myself: <em>I&apos;m disappointed in myself — I know I can do more.</em> That
            one sentence, over and over, is what kept me moving.
          </>
        ),
      },
    ],
  },
  {
    role: 'Public Relations',
    company: 'Himpunan Mahasiswa Teknik Telekomunikasi',
    period: '2023 — 2024',
    moments: [
      {
        title: "On staying patient with people who won't meet you halfway.",
        body: "Working with external partners taught me something I didn't expect: manners aren't about being nice, they're about staying composed when someone isn't giving you what you need — and finding a way forward anyway.",
      },
      {
        title: "On the problems that aren't mine to fix.",
        body: "Some obstacles come from outside, from people or circumstances I can't touch. I learned to stop there for a second less time each time, and ask instead: what's actually in my hands right now?",
      },
      {
        title: 'On the door that opens through someone you already know.',
        body: "More than once, the person I needed wasn't a stranger — they were a friend's friend, or a name that came up on a feed. I learned that networking isn't a skill you perform, it's attention you pay to the people already around you.",
      },
    ],
  },
  {
    role: 'Vice President',
    company: 'Himpunan Mahasiswa Teknik Telekomunikasi',
    period: '2024 — 2025',
    moments: [
      {
        title: 'On learning to listen before I lead.',
        body: "Leading people from completely different worlds taught me that my first move should never be talking. It should be understanding what they're actually carrying.",
      },
      {
        title: 'On the problem that solves itself into a new problem.',
        body: "I'd fix one thing and watch it quietly create another somewhere else. That's when I learned to step back and see the whole board — priorities, trade-offs, what actually serves the organization instead of just what's loudest today.",
      },
      {
        title: 'On finding the root before building something new.',
        body: "Getting different divisions to work together never came from insisting on the old way. It came from asking each one what they actually valued underneath their process — and building from there.",
      },
    ],
  },
  {
    role: 'F5 Network Engineer',
    company: 'PT. Mastersystem Infotama Tbk.',
    period: '2025 — Now',
    moments: [
      {
        title: 'On tracing the fire back to its source.',
        body: "There's a specific kind of quiet that happens when something breaks in production. First you trace it — cold, logical, step by step. Then, somewhere in that process, the fix stops being a checklist and starts needing imagination. I learned that solving fast isn't one skill wearing two hats — it's knowing when to switch between them.",
      },
      {
        title: 'On the handover that has to survive without me.',
        body: (
          <>
            Every shift ends the same way: someone else has to pick up exactly where I
            left off, without me there to explain the nuance. I used to think
            communication meant being clear. I learned it actually means being clear{' '}
            <em>for someone else&apos;s context</em>, not mine.
          </>
        ),
      },
      {
        title: 'On breathing steady in a live system.',
        body: "Production doesn't wait. I learned to move quickly and carefully at the same time — not because I got faster, but because I stopped treating speed and caution as a trade-off.",
      },
      {
        title: 'On arriving with nothing and still having something.',
        body: "I walked into F5 with no networking background at all. What I did have was Python. I learned that expertise isn't the only thing worth bringing to a new room — sometimes the outsider skill is exactly what the room needed.",
      },
    ],
  },
]

// Cycle the three earth-tone accents by stop position
const STOP_COLORS = ['terracotta', 'green', 'amber']

// A single moment: the title is a button that expands its story.
function Moment({ title, body }) {
  const [open, setOpen] = useState(false)

  return (
    <li className={`journey__moment${open ? ' journey__moment--open' : ''}`}>
      <button
        type="button"
        className="journey__moment-toggle"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="journey__moment-title">{title}</span>
        <span className="journey__moment-icon" aria-hidden="true" />
      </button>
      <div className="journey__moment-panel">
        <p className="journey__moment-body">{body}</p>
      </div>
    </li>
  )
}

export default function LessonsSection() {
  useScrollReveal()

  return (
    <section className="section lessons" id="lessons">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '0.5rem' }}>
          <span className="section-label">Lessons Learned</span>
          <h2 className="section-heading">
            One journey, <span className="highlight">four chapters</span>
          </h2>
        </div>

        <div className="journey">
          <ol className="journey__track">
            {JOURNEY.map((stop, i) => (
              <li
                key={`${stop.role}-${i}`}
                className={`journey__stop reveal reveal-delay-${(i % 3) + 1}`}
                data-color={STOP_COLORS[i % 3]}
              >
                <div className="journey__marker">
                  <span className="journey__node" />
                </div>

                <span className="journey__period">{stop.period}</span>

                <div className="journey__card">
                  <div className="journey__role">{stop.role}</div>
                  <div className="journey__company">{stop.company}</div>

                  <ul className="journey__moments">
                    {stop.moments.map((m, j) => (
                      <Moment key={j} title={m.title} body={m.body} />
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
