import useScrollReveal from '../../hooks/useScrollReveal'

// Photo hidden for now — flip back on once a real photo is ready
const SHOW_PHOTO = false

export default function AboutSection() {
  useScrollReveal()

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className={`about__grid${SHOW_PHOTO ? '' : ' about__grid--no-photo'}`}>
          {SHOW_PHOTO && (
            <div className="reveal reveal--left">
              <div className="about__photo">
                <div className="about__photo-frame">
                  👤
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="reveal">
              <span className="section-label">About Me</span>
              <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
                A bit about <span className="highlight">me</span>
              </h2>

              <p className="about__lead">Hi, I'm Devan.</p>

              <p className="about__bio">
                I believe that life is less about reaching a destination and more about
                who you become along the way.
              </p>
              <p className="about__bio">
                Some of my favorite lessons didn't come from classrooms or careers. They
                came from long runs when my legs wanted to stop but my mind kept going.
                From standing on a mountain before sunrise and realizing how small I am
                compared to the world around me. From music that understood what I couldn't
                put into words. From quiet moments that reminded me to slow down and pay
                attention.
              </p>
              <p className="about__bio">
                I try to live deliberately in a world that often feels rushed. I enjoy
                reading, writing, traveling, and spending time in nature—not because they
                help me get ahead, but because they help me stay grounded. They remind me
                that there is more to life than deadlines, notifications, and constantly
                chasing the next thing.
              </p>
              <p className="about__bio">
                At my core, I am driven by <span className="highlight">curiosity</span>. I
                love learning, exploring new ideas, and understanding how things work—not
                just systems and technology, but people, perspectives, and life itself.
                Every experience, whether successful or difficult, is an opportunity to grow.
              </p>
              <p className="about__bio">
                What motivates me most is the pursuit of freedom—the freedom to choose how I
                spend my time, where I direct my energy, and what kind of life I want to
                build. Not freedom from responsibility, but freedom through discipline,
                patience, and continuous self-improvement.
              </p>
              <p className="about__bio">
                I don't have everything figured out, and I don't think anyone truly does.
                What I do know is that meaningful things take time. Mountains are climbed one
                step at a time. Strong character is built one decision at a time. Great lives
                are shaped by small actions repeated consistently over years.
              </p>
              <p className="about__bio">
                So that's what I'm doing: learning, growing, exploring, and moving
                forward—one honest step at a time.
              </p>

              <blockquote className="about__quote">
                Life is not a race against other people. It's a journey of becoming the
                person you're capable of being.
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
