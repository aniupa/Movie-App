import {lazy} from 'react'

import {Route,Routes} from 'react-router-dom'
const Home = lazy(() => import('../pages/home/HomePg.jsx'));

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
    </Routes>
  )
}

export default MainRoutes