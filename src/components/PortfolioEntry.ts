import type { Project } from '../types'
import { createCarousel } from './Carousel'

export function createPortfolioEntry(project: Project): HTMLElement {
  const section = document.createElement('section')
  section.className = 'project'

  const title = document.createElement('h2')
  title.textContent = project.title
  section.appendChild(title)

  const subtitle = document.createElement('div')
  subtitle.className = 'subtitle'
  subtitle.textContent = project.subtitle
  section.appendChild(subtitle)

  if (project.roles) {
    const roles = document.createElement('div')
    roles.className = 'roles'
    roles.innerHTML = `<strong>Role:</strong> ${project.roles}`
    section.appendChild(roles)
  }

  const carousel = createCarousel(project)
  section.appendChild(carousel)

  const description = document.createElement('p')
  description.className = 'description'
  description.textContent = project.description
  section.appendChild(description)

  return section
}


