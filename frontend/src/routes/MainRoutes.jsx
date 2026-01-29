import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "../utlits/loader/loader.jsx";


const Home = lazy(() => import("../pages/home/HomePg.jsx"));
const Login = lazy(() => import("../pages/authentication/login/login.jsx"));
const Register = lazy(() => import("../pages/authentication/register/Register.jsx"));
const CreateMoviePage = lazy(() => import("../pages/Admin/CreateMoviePage.jsx"));


const MainRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Suspense fallback={<Loader/>}><Home /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<Loader/>}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<Loader/>}><Register /></Suspense>} />
        <Route path="/admin/create-movie" element={<Suspense fallback={<Loader/>}><CreateMoviePage /></Suspense>} />
      </Routes>
  );
};

export default MainRoutes;
