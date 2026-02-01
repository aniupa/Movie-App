import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "../utlits/loader/loader.jsx";
import { useSelector } from "react-redux";

const Home = lazy(() => import("../pages/home/HomePg.jsx"));
const Login = lazy(() => import("../pages/authentication/login/login.jsx"));
const Register = lazy(
  () => import("../pages/authentication/register/Register.jsx"),
);
const CreateMoviePage = lazy(
  () => import("../pages/Admin/CreateMoviePage.jsx"),
);
const UpdateMoviePage = lazy(
  () => import("../pages/Admin/UpdateMoviePage.jsx"),
);

const MainRoutes = () => {
  const isAdmin = useSelector((state) => state?.user?.data?.role === "admin");

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {isAdmin && (
          <>
            <Route path="/admin/create-movie" element={<CreateMoviePage />} />
            <Route
              path="/admin/update-movie/:id"
              element={<UpdateMoviePage />}
            />
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
