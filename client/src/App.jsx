import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from '../pages/Home'
import Login from '../pages/Login'
import PasswordReset from '../pages/PasswordReset'
import VerifyAccount from '../pages/VerifyAccount'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/passwordReset' element={<PasswordReset/>}></Route>
        <Route path='/verifyAccount' element={<VerifyAccount/>}></Route>
      </Routes>
    </>
  )
}

export default App
