
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './scss/common.scss'

// 기존 스크롤 위치 복원 방지
window.history.scrollRestoration = 'manual'

// 새로고침 시 화면 최상단으로 이동
window.addEventListener('load', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  })
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
