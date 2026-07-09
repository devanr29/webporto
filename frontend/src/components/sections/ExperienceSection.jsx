import useScrollReveal from '../../hooks/useScrollReveal'

const WORK = [
  {
    role: 'Network Engineer (F5) — Bank Mandiri Project',
    company: 'PT. Mastersystem Infotama Tbk.',
    date: 'Oct 2025 — Present',
    bullets: [
      'Configure, maintain, and troubleshoot F5 BIG-IP LTM & GTM infrastructure — Virtual Servers, Pools, DNS, SSL/TLS, and health monitoring — across 24 physical appliances plus multiple VE instances (64 hosts total), ensuring high availability for Bank Mandiri’s business-critical banking applications through DNS traffic swings, application switchovers, and zero-downtime pool member lifecycle management.',
      'Joined with zero prior F5 or production networking experience and was running independent 24/7 shift rotations within 2 weeks — learning live, business-critical banking operations under direct production pressure rather than in a training environment.',
      'Designed and deployed three custom Python automation scripts that eliminated recurring manual bottlenecks: a 45-minute task cut to 1 minute, a multi-day assessment (up to 3 days) cut to 30 minutes, and a 90-minute task cut to 15 minutes — collectively reclaiming dozens of hours per cycle.',
    ],
  },
]

const ORGANIZATIONAL = [
  {
    role: 'Vice President',
    company: 'Himpunan Mahasiswa Teknik Telekomunikasi',
    date: 'Sep 2024 — Jan 2025',
    bullets: [
      'Supervised 5 departments and 60 members, including direct oversight of the Ministry of Science & Student Development and the Ministry of External Affairs.',
      'Facilitated cross-ministry collaboration and monitored initiative progress to keep concurrent projects on track.',
      'Held standing authority to lead the entire association in the President’s absence or during emergencies.',
    ],
  },
  {
    role: 'Senior Staff, Public Relations',
    company: 'Himpunan Mahasiswa Teknik Telekomunikasi',
    date: 'Apr 2023 — Sep 2024',
    bullets: [
      'Coordinated a monthly talk show with Telecommunication Engineering alumni to share experience and knowledge.',
      'Led the “Telco Thanksgiving” event to appreciate external organizations for their continued support of our programs.',
    ],
  },
  {
    role: 'Junior Staff, Public Relations',
    company: 'Himpunan Mahasiswa Teknik Telekomunikasi',
    date: 'Feb 2023 — Mar 2023',
    bullets: [
      'Moderated “Telcotalks,” a Live Instagram event for HMTT, ensuring smooth operations and engaging discussion.',
    ],
  },
  {
    role: 'Head of Public Relations Division',
    company: 'Cybersecurity, Multimedia & Big Data Laboratory',
    date: 'Aug 2024 — Jan 2025',
    bullets: [
      'Established media partnerships with organizations outside the campus.',
      'Acted as a liaison between the internal laboratory and external parties.',
      'Led branding initiatives to enhance the lab’s public image and visibility.',
    ],
  },
  {
    role: 'Head of DIKLAT 47 (DP 2023)',
    company: 'Perhimpunan Penjelajah Alam Jamadagni',
    date: 'Feb 2023 — Apr 2024',
    bullets: [
      'Created a development plan for young members.',
      'Ensured the attainment of the values instilled in young members.',
      'As the highest authority, made the decision to appoint young members as full members.',
    ],
  },
  {
    role: 'Head of Secretariat & Logistics (DP 2022–2023)',
    company: 'Perhimpunan Penjelajah Alam Jamadagni',
    date: 'Jun 2022 — Jan 2023',
    bullets: [
      'Recorded all equipment owned by the organization.',
      'Managed all borrowed equipment and equipment lending.',
      'Organized monthly office-cleaning activities in the secretariat.',
    ],
  },
  {
    role: 'Field Coordinator — Mt. Sindoro Expedition (DIKLAT 43)',
    company: 'Perhimpunan Penjelajah Alam Jamadagni',
    date: 'Sep 2021',
    bullets: [
      'Kept the event on track from the preparation stage onward.',
      'Made on-the-spot decisions to resolve any problems in the field.',
      'Ensured the safety of all 43 Jamadagni young staff.',
    ],
  },
]

function Timeline({ items }) {
  return (
    <div className="experience__timeline">
      {items.map((exp, i) => (
        <div
          key={`${exp.company}-${i}`}
          className={`experience__item reveal reveal-delay-${(i % 3) + 1}`}
        >
          <div className="experience__dot" />
          <div className="experience__card">
            <div className="experience__header">
              <div>
                <div className="experience__role">{exp.role}</div>
                <div className="experience__company">{exp.company}</div>
              </div>
              <span className="experience__date">{exp.date}</span>
            </div>
            <ul className="experience__bullets">
              {exp.bullets.map((b, j) => (
                <li key={j} className="experience__bullet">{b}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

const groupLabelStyle = {
  fontFamily: 'var(--fh)',
  fontSize: '0.8rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--accent)',
  marginBottom: '1.5rem',
}

export default function ExperienceSection() {
  useScrollReveal()

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '0.5rem' }}>
          <span className="section-label">Work History</span>
          <h2 className="section-heading">
            Where I&apos;ve <span className="highlight">worked</span>
          </h2>
        </div>

        <h3 className="reveal" style={groupLabelStyle}>Professional</h3>
        <Timeline items={WORK} />

        <h3 className="reveal" style={{ ...groupLabelStyle, marginTop: '2.5rem' }}>
          Organizational
        </h3>
        <Timeline items={ORGANIZATIONAL} />
      </div>
    </section>
  )
}
