import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { asyncLoginUser } from "./../../../redux/actions/userAction";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

 const submitHandler = async (data) => {
    try {

      dispatch(asyncLoginUser(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterPage = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.04)",
        
      }}
    >
      <Card sx={{ width: 380, boxShadow: 3 }}>
        <CardContent>
          {/* Logo */}
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            login
          </Typography>

          {/* Title */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sign in
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              {...register("email")}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              size="small"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              required
              // helperText="Passwords must be at least 6 characters."
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#f5c518",
                color: "#000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#e6b800",
                },
              }}
            >
              Continue
            </Button>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>New User?</Divider>

          {/* Create Account */}
          <Button
            fullWidth
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "#999",
              color: "#000",
            }}
            onClick={() => RegisterPage()}
          >
            Create your account
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
