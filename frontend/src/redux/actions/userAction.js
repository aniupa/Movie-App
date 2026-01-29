import axios from "../../utlits/axios.js";

import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
import { logoutUser,loadUser } from "../features/UserSlice.js";

export const asyncRegisterUser = (data) => async () => {
  try {
    await axios.post("/auth/user/register", data);
    toast.success("user registered successfully");
  } catch (error) {
    if (error?.response?.status === 409) {
      toast.error("Email already registered, login instead");
    } else {
      console.log(error);
    }
  }
};
export const asyncLoginUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/user/login", data, {
      withCredentials: true,
    });
    dispatch(asyncCurrentUser(response.data.user));
    
    toast.success("Login successful");
  } catch (error) {
    if (error?.response?.status === 401) {
      toast.error("Invalid credentials");
    } else {
      console.log(error);
    }
  }
}

export const asyncCurrentUser = () => async (dispatch) => {
  try {

    const res = await axios.get("/auth/user/currentUser", {
      withCredentials: true, // 🔥 sends cookie
    });
    

    dispatch(loadUser(res.data.user));
  } catch (error) {
    console.log("Error fetching current user:", error);
  }
}
export const asyncLogoutUserAction = () => async (dispatch) => {
  try {
    await axios.get(
      "/auth/logout"
      
    );
    dispatch(logoutUser(null));
    // dispatch(logoutUser(null));
    // dispatch({ type: "LOGOUT_USER" });
    toast.success("Logout successful");
  } catch (error) {
    console.log("Error during logout:", error);
  }
}