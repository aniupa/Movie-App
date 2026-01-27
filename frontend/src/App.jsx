import React from "react";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./component/NavBar.jsx";
import {
  asyncLogoutUserAction,
  asyncCurrentUser,
} from "./redux/actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LazyToast from "./component/LazyToast.jsx";
import { asyncLoadMoviesAction, asyncSearchMoviesAction } from "./redux/actions/movies.action.js";
import { useState } from "react";
const App = () => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.user.data);
 const [page, setPage] = useState(1);
const limit = 5;
  useEffect(() => {
    dispatch(asyncCurrentUser());
  }, [dispatch]);
const handleSearch = (query) => {

  dispatch(asyncSearchMoviesAction({ page: page, limit: limit, search: query }));
}
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(asyncLogoutUserAction());
    navigate("/");
  };

  return (
    <>
      <Navbar
        isAuthenticated={userLoggedIn ? true : false}
        onLogin={() => navigate("/login")}
        onRegister={() => navigate("/register")}
        onLogout={handleLogout}
        onSearch={(query) => handleSearch(query)}
      />

      <MainRoutes />
      <LazyToast />
    </>
  );
};

export default App;
