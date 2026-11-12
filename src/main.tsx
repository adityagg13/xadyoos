import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { DocsPage } from './pages/DocsPage'
import './styles.css'

// Two pages share this bundle: the landing page at / and the docs at /docs.
// Vercel's catch-all rewrite serves index.html for both, so routing is
// pathname-based. Links between them are plain <a> navigations.
const path = window.location.pathname.replace(/\/+$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>{path === '/docs' ? <DocsPage /> : <App />}</StrictMode>,
)
