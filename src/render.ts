import type { Manifest } from './types'
import { createPortfolioEntry } from './components/PortfolioEntry'

export function renderApp(root: HTMLElement, manifest: Manifest) {
  root.innerHTML = ''

  // Skip navigation link for keyboard users
  const skipLink = document.createElement('a')
  skipLink.href = '#content'
  skipLink.className = 'skip-link'
  skipLink.textContent = 'Skip to main content'
  root.appendChild(skipLink)

  const container = document.createElement('div')
  container.className = 'container'

  container.appendChild(renderHeader(manifest))

  const main = document.createElement('main')
  main.id = 'content'

  for (const project of manifest.projects) {
    main.appendChild(createPortfolioEntry(project))
  }

  container.appendChild(main)
  root.appendChild(container)
}

function renderHeader(manifest: Manifest) {
  const header = document.createElement('header')
  header.className = 'site-header'

  const nameRow = document.createElement('div')
  nameRow.className = 'name-row'

  const h1 = document.createElement('h1')
  h1.textContent = manifest.header.name
  nameRow.appendChild(h1)

  // defer contact until after name/abilities

  const abilities = manifest.header.abilities ?? ''
  const logline = manifest.header.logline ?? manifest.header.statement ?? ''

  if (abilities) {
    const abilitiesInline = document.createElement('span')
    abilitiesInline.className = 'abilities-inline'
    abilitiesInline.textContent = abilities
    nameRow.appendChild(abilitiesInline)
  }

  header.appendChild(nameRow)

  // now render contact after name/abilities
  const contact = document.createElement('div')
  contact.className = 'contact'
  const parts: (HTMLElement | Text)[] = []

  if (manifest.header.city) {
    parts.push(document.createTextNode(manifest.header.city))
  }

  if (manifest.header.email) {
    if (parts.length) parts.push(document.createTextNode(' · '))
    const a = document.createElement('a')
    a.href = `mailto:${manifest.header.email}`
    a.textContent = manifest.header.email
    parts.push(a)
  }

  if (manifest.header.linkedin) {
    if (parts.length) parts.push(document.createTextNode(' · '))
    const a = document.createElement('a')
    const url = manifest.header.linkedin.startsWith('http')
      ? manifest.header.linkedin
      : `https://${manifest.header.linkedin}`
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.textContent = manifest.header.linkedin
    parts.push(a)
  }

  parts.forEach(p => contact.appendChild(p))
  header.appendChild(contact)

  if (logline) {
    const loglineEl = document.createElement('p')
    loglineEl.className = 'statement'
    loglineEl.textContent = logline
    header.appendChild(loglineEl)
  }

  return header
}


