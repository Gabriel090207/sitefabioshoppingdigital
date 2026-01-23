import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout/MainLayout'

import Home from './pages/Home/Home'
import Stores from './pages/Stores/Stores'
import Store from './pages/Store/Store'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lojas" element={<Stores />} />
        <Route path="/loja/:id" element={<Store />} />
      </Routes>
    </MainLayout>
  )
}

export default App
