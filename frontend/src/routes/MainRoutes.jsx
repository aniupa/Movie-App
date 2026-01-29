import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "../utlits/loader/loader.jsx";
import { useSelector } from "react-redux";
import UpdateMoviePage from "../pages/Admin/UpdateMoviePage.jsx";


const Home = lazy(() => import("../pages/home/HomePg.jsx"));
const Login = lazy(() => import("../pages/authentication/login/login.jsx"));
const Register = lazy(() => import("../pages/authentication/register/Register.jsx"));
const CreateMoviePage = lazy(() => import("../pages/Admin/CreateMoviePage.jsx"));



const MainRoutes = () => {
  const isAdmin=useSelector((state)=>state?.user?.data?.role==='admin');
  return (
      <Routes>
        <Route path="/" element={<Suspense fallback={<Loader/>}><Home /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<Loader/>}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<Loader/>}><Register /></Suspense>} />
        {isAdmin && (
          <>
            <Route path="/admin/create-movie" element={<Suspense fallback={<Loader/>}><CreateMoviePage /></Suspense>} />
            <Route path="/admin/update-movie/:id" element={<Suspense fallback={<Loader/>}><UpdateMoviePage /></Suspense>} />
          </>
        )}
      </Routes>
  );
};

export default MainRoutes;
