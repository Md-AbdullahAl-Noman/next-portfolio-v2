import { Container } from '@/components/ui/container'

import ProjectContent from './components/content'
import NavigationTab from '@/components/navigation/nav-tab'

export default function ProjectPage() {
  return (
    <main className="h-full min-h-screen">
      <Container>
        <ProjectContent />
      </Container>
    </main>
  )
}
