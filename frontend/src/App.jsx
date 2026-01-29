import MainRoutes from "./routes/MainRoutes";
import Navbar from "./component/NavBar.jsx";
import { asyncCurrentUser } from "./redux/actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LazyToast from "./component/LazyToast.jsx";
const App = () => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.user.data);
  useEffect(() => {
    dispatch(asyncCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Navbar
        isAuthenticated={userLoggedIn ? true : false}
        role={userLoggedIn?.role}
      />

      <MainRoutes />
      <LazyToast />
    </>
  );
};

export default App;
