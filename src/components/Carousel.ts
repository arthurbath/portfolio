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
    image.alt = img.alt
    slide.appendChild(image)

    slides.push(slide)
    container.appendChild(slide)
  })

  // Thumbnails
  const thumbs = document.createElement('div')
  thumbs.className = 'thumbs'

  project.images.forEach((img, idx) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    if (idx === 0) btn.setAttribute('aria-current', 'true')
    const t = document.createElement('img')
    t.src = img.src
    t.alt = ''
    btn.appendChild(t)
    btn.addEventListener('click', () => goTo(idx))
    thumbs.appendChild(btn)
  })

  const wrapper = document.createElement('div')
  wrapper.appendChild(container)
  wrapper.appendChild(thumbs)

  let active = 0
  let timer: number | undefined

  function goTo(next: number) {
    if (next === active) return
    slides[active].classList.remove('is-active')
    slides[next].classList.add('is-active')
    const buttons = Array.from(thumbs.querySelectorAll('button'))
    buttons.forEach(b => b.removeAttribute('aria-current'))
    buttons[next].setAttribute('aria-current', 'true')
    active = next
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

  wrapper.tabIndex = 0
  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo((active + 1) % slides.length) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo((active - 1 + slides.length) % slides.length) }
  })

  start()
  return wrapper
}


