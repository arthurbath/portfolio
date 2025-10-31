#!/usr/bin/env node
/* Validate portfolio-data.json for missing alt text and other issues */
const fs = require('fs')
const path = require('path')

const manifestPath = path.resolve(process.cwd(), 'src', 'portfolio-data.json')

if (!fs.existsSync(manifestPath)) {
  console.error('[validate] Manifest not found:', manifestPath)
  process.exit(1)
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
let hasWarnings = false

// Check for missing alt text in images
manifest.projects?.forEach((project, projIdx) => {
  project.images?.forEach((img, imgIdx) => {
    if (!img.alt || img.alt.trim() === '') {
      console.warn(
        `[validate] Missing alt text: Project "${project.title || project.id || projIdx}" image ${imgIdx + 1} (${img.src})`
      )
      hasWarnings = true
    }
  })
})

// Check for required fields
if (!manifest.header?.name) {
  console.warn('[validate] Missing header.name')
  hasWarnings = true
}

if (!manifest.projects || manifest.projects.length === 0) {
  console.warn('[validate] No projects found in manifest')
  hasWarnings = true
}

if (hasWarnings) {
  console.log('[validate] Validation complete with warnings (non-blocking)')
} else {
  console.log('[validate] Manifest validation passed')
}



