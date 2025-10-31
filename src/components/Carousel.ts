import type { Project } from '../types'

export function createCarousel(project: Project): HTMLElement {
  const container = document.createElement('div')
  container.className = 'carousel'
  container.setAttribute('role', 'region')
  container.setAttribute('aria-label', `${project.title} images`)

  const slides: HTMLDivElement[] = []
  project.images.forEach((img, idx) => {
    const slide = document.createElement('div')
    slide.className = 'slide' + (idx === 0 ? ' is-active' : '')

    const image = document.createElement('img')
    image.src = img.src
    image.alt = img.alt || `Project image ${idx + 1}`
    // Only lazy load images beyond the first two (first is active, second will be preloaded)
    if (idx > 1) {
      image.loading = 'lazy'
    }
    // Add error handling
    image.addEventListener('error', () => {
      image.alt = 'Image failed to load'
      console.warn(`Failed to load image: ${img.src}`)
    })
    slide.appendChild(image)

    slides.push(slide)
    container.appendChild(slide)
  })

  // Preload next image after first slide loads
  if (project.images.length > 1) {
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'image'
    preloadLink.href = project.images[1].src
    document.head.appendChild(preloadLink)
  }

  // Thumbnails (only show if more than 1 image)
  const thumbs = document.createElement('div')
  thumbs.className = 'thumbs'

  if (project.images.length > 1) {
    project.images.forEach((img, idx) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.setAttribute('aria-label', `View image ${idx + 1} of ${project.images.length}: ${img.alt || 'Project image'}`)
      if (idx === 0) btn.setAttribute('aria-current', 'true')
      const t = document.createElement('img')
      t.src = img.src
      t.alt = img.alt || `Thumbnail ${idx + 1}`
      t.setAttribute('role', 'presentation')
      btn.appendChild(t)
      btn.addEventListener('click', () => goTo(idx))
      thumbs.appendChild(btn)
    })
  }

  const wrapper = document.createElement('div')
  wrapper.appendChild(container)
  if (project.images.length > 1) {
    wrapper.appendChild(thumbs)
  }

  let active = 0
  let timer: number | undefined

  function goTo(next: number) {
    if (next === active) return
    slides[active].classList.remove('is-active')
    slides[next].classList.add('is-active')
    if (project.images.length > 1) {
      const buttons = Array.from(thumbs.querySelectorAll('button'))
      buttons.forEach(b => b.removeAttribute('aria-current'))
      buttons[next].setAttribute('aria-current', 'true')
    }
    active = next

    // Preload next image
    const nextIdx = (next + 1) % project.images.length
    if (nextIdx !== next && !document.querySelector(`link[href="${project.images[nextIdx].src}"]`)) {
      const preloadLink = document.createElement('link')
      preloadLink.rel = 'preload'
      preloadLink.as = 'image'
      preloadLink.href = project.images[nextIdx].src
      document.head.appendChild(preloadLink)
    }
  }

  function step() {
    goTo((active + 1) % slides.length)
  }

  function start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    stop()
    timer = window.setInterval(step, 5000)
  }

  function stop() {
    if (timer) window.clearInterval(timer)
  }

  wrapper.addEventListener('mouseenter', stop)
  wrapper.addEventListener('mouseleave', start)

  container.setAttribute('tabindex', '0')
  container.setAttribute('aria-roledescription', 'carousel')
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo((active + 1) % slides.length) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo((active - 1 + slides.length) % slides.length) }
  })

  if (project.images.length > 1) {
    start()
  }
  return wrapper
}


