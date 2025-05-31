'use client'
import { Container } from '@/components/ui/container'
import ProjectContent from './components/content'

import projects from '@/data/projects.json'
import NavigationTab from '@/components/navigation/nav-tab'

export default function ProjectPage({
  params,
}: {
  params: {
    projectId: string
  }
}) {
  const project = projects.find((project) => project.id === params.projectId)

  if (!project) {
    return (
      <div className="flex items-center justify-center py-20 text-2xl font-bold">
        Project not found
      </div>
    )
  }

  return (
    <main className="h-full min-h-screen">
      <Container>
        <NavigationTab />
      </Container>
      <Container>
        <ProjectContent data={project} />
      </Container>
    </main>
  )
}
