import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import TodosPage from './pages/todosPage';
import PrivateRoute from './components/privateRoute';
import './App.css'
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        <Route element={<PrivateRoute />}>
          <Route path='/todos' element={<TodosPage />} />
        </Route>

        <Route
          path='*'
          element={
            localStorage.getItem('token')
              ? <Navigate to='/todos' replace />
              : <Navigate to='/login' replace />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
