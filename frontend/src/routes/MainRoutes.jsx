import {lazy} from 'react'

import {Route,Routes} from 'react-router-dom'
const Home = lazy(() => import('../pages/home/HomePg.jsx'));
const Login = lazy(() => import('../pages/authentication/login/login.jsx'));
const Register = lazy(() => import('../pages/authentication/register/Register.jsx'));

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
    </Routes>
  )
}

export default MainRoutes