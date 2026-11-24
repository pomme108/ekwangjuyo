import { Route, Routes } from 'react-router-dom'
import './firebase/firebase'
import { MainLayout } from './components/layout/MainLayout'
import { Home } from './pages/Home'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={null} />
      </Route>
    </Routes>
  )
}

export default App
