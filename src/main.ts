import './styles.css'
import { renderApp } from './render'
import type { Manifest } from './types'
import manifestJson from './manifest.json'

const app = document.querySelector<HTMLDivElement>('#app')!
renderApp(app, manifestJson as Manifest)
