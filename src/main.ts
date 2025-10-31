import './styles.css'
import { renderApp } from './render'
import type { Manifest } from './types'
import manifestJson from './portfolio-data.json'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) {
  throw new Error('App container not found')
}

try {
  // Basic validation
  const manifest = manifestJson as Manifest
  if (!manifest.header || !manifest.projects) {
    throw new Error('Invalid manifest structure: missing header or projects')
  }
  if (!Array.isArray(manifest.projects)) {
    throw new Error('Invalid manifest: projects must be an array')
  }
  
  renderApp(app, manifest)
} catch (error) {
  console.error('Failed to load portfolio:', error)
  app.innerHTML = `
    <div class="container" style="padding: 64px 24px; text-align: center;">
      <h1>Portfolio Loading Error</h1>
      <p>Unable to load portfolio content. Please refresh the page.</p>
      <p style="color: var(--muted); font-size: 14px;">${error instanceof Error ? error.message : 'Unknown error'}</p>
    </div>
  `
}
