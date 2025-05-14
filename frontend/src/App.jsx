import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='*' element={<Navigate to="/login" replace/>} />
      </Routes>
    </Router>
  )
}

export default App
