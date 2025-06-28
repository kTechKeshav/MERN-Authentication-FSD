import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import PasswordReset from './pages/PasswordReset'
import EmailVerify from './pages/EmailVerify'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/passwordReset' element={<PasswordReset/>}></Route>
        <Route path='/email-verify' element={<EmailVerify/>}></Route>
      </Routes>
    </>
  )
}

export default App
