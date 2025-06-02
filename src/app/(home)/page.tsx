import { BackgroundBeamsWithCollision } from '@/components/ui/collison-bean'
import About from './section/about'
import Contact from './section/contact'
import Hero from './section/hero'
import Projects from './section/projects'
import Skills from './section/skills'

import BackgroundParticles from '@/components/bg-particles'
import Footer from '@/components/navigation/footer'
import NavigationTab from '@/components/navigation/nav-tab'
import { Container } from '@/components/ui/container'

export default function Home() {
  return (
    <main className="relative  bg-[var(--foreground)]">
      <NavigationTab />
      <BackgroundParticles />

      <div className=" h-full min-h-screen rounded-b-[100px] border-b bg-[#121212]">
        <section id="hero">
          <Container>
            <Hero />
          </Container>
        </section>
      </div>
      <div className="to-[#e0ece4 bg-gradient-to-b from-[#f9f7f7] text-[var(--background)]">
        <section id="about" className="h-full min-h-screen ">
          
          <Container>
            <About />
          </Container>
        </section>
        <section id="skills" className="h-full min-h-screen">
          <Container>
            <Skills />
          </Container>
        </section>
        <section
          id="projects"
          className="h-full min-h-screen bg-[var(--foreground)]"
        >
          <BackgroundBeamsWithCollision className="to-[#e0ece4 h-full border-none bg-gradient-to-b from-[#f9f7f7]">
            <Container>
              <Projects />
            </Container>
          </BackgroundBeamsWithCollision>
        </section>
        <section id="contact" className="h-full">
          <Container>
            <Contact />
          </Container>
        </section>
      </div>
      <div className=" w-full rounded-t-[100px] border-t bg-[#121212]">
        <Footer />
      </div>
    </main>
  )
}
