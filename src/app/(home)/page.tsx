import About from './section/about'
import Contact from './section/contact'
import Hero from './section/hero'
import Journey from './section/journey'
import Projects from './section/projects'
import Skills from './section/skills'

import AnimatedBackground from '@/components/animated-background'
import CursorGlow from '@/components/cursor-glow'
import CustomCursor from '@/components/custom-cursor'
import Footer from '@/components/navigation/footer'
import NavigationTab from '@/components/navigation/nav-tab'
import Preloader from '@/components/preloader'
import TechMarquee from '@/components/tech-marquee'
import { Container } from '@/components/ui/container'

export default function Home() {
  return (
    <main className="relative bg-background text-foreground">
      <Preloader />
      <AnimatedBackground />
      <CursorGlow />
      <CustomCursor />
      <NavigationTab />

      <div className="relative z-10">
        <section id="hero">
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

        <section id="experience">
          <Container>
            <Journey />
          </Container>
        </section>

        <section id="work">
          <Container>
            <Projects />
          </Container>
        </section>

        <section id="skills">
          <Container>
            <Skills />
          </Container>
        </section>

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
