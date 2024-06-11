import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Layout>
  )
}

export default App
