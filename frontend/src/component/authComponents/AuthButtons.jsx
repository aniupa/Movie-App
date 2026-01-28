import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { asyncLogoutUserAction } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
const AuthButtons = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const onLogin = () => navigate("/login");
  const onRegister = () => navigate("/register");
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(asyncLogoutUserAction());
    navigate("/");
  }
  return (
    <>
      {!isAuthenticated ? (
        <>
          <Button color="inherit" onClick={onLogin}>
            Login
          </Button>
          <Button variant="contained" color="error" onClick={onRegister}>
            Register
          </Button>
        </>
      ) : (
         <Button color="inherit" onClick={onLogout}>
        Logout
      </Button>
      )}
    </>
  );
};

export default AuthButtons;
