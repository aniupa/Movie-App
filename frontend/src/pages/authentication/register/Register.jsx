
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { asyncRegisterUser } from "../../../redux/actions/userAction.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const { register, reset, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    try {

      dispatch(asyncRegisterUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  const loginPage = () => {
    navigate("/login");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      <Box width="100%">
        {/* Logo */}
        {/* <Box textAlign="center" mb={2}> */}
          {/* <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", mb: 2 }}
          }>
            register
          </Typography> */}
        {/* </Box> */}

        {/* Card */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" mb={2}>
            Create account
          </Typography>

          <Box component="form">
            <TextField
              label="Your name"
              placeholder="Username"
              fullWidth
              margin="normal"
              {...register("username")}
              required
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email")}
              required
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              size="small"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              required
              helperText="Passwords must be at least 6 characters."
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
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#f0c14b",
                color: "#111",
                "&:hover": {
                  backgroundColor: "#ddb347",
                },
                textTransform: "none",
                fontWeight: 500,
              }}
              onClick={handleSubmit(submitHandler)}
            >
              Create your account
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            Already have an account?{" "}
            <Link onClick={loginPage} underline="hover">
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
