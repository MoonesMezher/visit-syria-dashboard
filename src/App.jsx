import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
