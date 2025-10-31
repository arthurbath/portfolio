import type { Project } from '../types'
import { createCarousel } from './Carousel'

export function createPortfolioEntry(project: Project): HTMLElement {
  const article = document.createElement('article')
  article.className = 'project'
  article.setAttribute('id', `project-${project.id}`)

  const title = document.createElement('h2')
  title.textContent = project.title
  article.appendChild(title)

  const subtitle = document.createElement('div')
  subtitle.className = 'subtitle'
  subtitle.textContent = project.subtitle
  article.appendChild(subtitle)

  if (project.roles) {
    const roles = document.createElement('div')
    roles.className = 'roles'
    roles.innerHTML = `<strong>Role:</strong> ${project.roles}`
    article.appendChild(roles)
  }

  const carousel = createCarousel(project)
  article.appendChild(carousel)

  const description = document.createElement('p')
  description.className = 'description'
  description.textContent = project.description
  article.appendChild(description)

  return article
}


