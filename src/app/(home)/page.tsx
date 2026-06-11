import About from './section/about'
import Contact from './section/contact'
import Hero from './section/hero'
import Journey from './section/journey'
import Projects from './section/projects'
import Skills from './section/skills'

import BackgroundParticles from '@/components/bg-particles'
import CursorGlow from '@/components/cursor-glow'
import Footer from '@/components/navigation/footer'
import NavigationTab from '@/components/navigation/nav-tab'
import TechMarquee from '@/components/tech-marquee'
import { Container } from '@/components/ui/container'

const Divider = () => (
  <div className="mx-auto h-px w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
)

export default function Home() {
  return (
    <main className="relative bg-background text-foreground">
      <NavigationTab />
      <BackgroundParticles />
      <CursorGlow />

      {/* ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-sky-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative z-10">
        <section id="hero" className="bg-grid mask-fade">
          <Container>
            <Hero />
          </Container>
        </section>

        <TechMarquee />

        <section id="about">
          <Container>
            <About />
          </Container>
        </section>

        <Divider />

        <section id="journey">
          <Container>
            <Journey />
          </Container>
        </section>

        <Divider />

        <section id="skills">
          <Container>
            <Skills />
          </Container>
        </section>

        <Divider />

        <section id="projects">
          <Container>
            <Projects />
          </Container>
        </section>

        <Divider />

        <section id="contact">
          <Container>
            <Contact />
          </Container>
        </section>

        <Footer />
      </div>
    </main>
  )
}
