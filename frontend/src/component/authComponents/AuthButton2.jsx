import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { asyncLogoutUserAction } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
const AuthButton2 = ({ isAuthenticated }) => {
  const navigate = useNavigate();
const dispatch = useDispatch();
  const onLogin = () => {
    navigate("/login");
  };
  const onRegister = () => {
    navigate("/register");
  };
  const onLogout = () => {
    dispatch(asyncLogoutUserAction());
    navigate("/");
  }
  return (
    <>
      {!isAuthenticated ? (
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={onLogin}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={onRegister}>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <ListItem disablePadding>
          <ListItemButton onClick={onLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
};

export default AuthButton2;
