import { Route, Routes } from 'react-router-dom'
import './firebase/firebase'
import { MainLayout } from './components/layout/MainLayout'
// 메인 메뉴
import { Home } from './pages/home/Home';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
                {/* 메인 */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={null} />
      </Route>
    </Routes>
  )
}

export default App
