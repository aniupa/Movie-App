import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Divider,
  Link,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register, reset, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const submitHandler = (data) => {
    console.log(data);
  };
   const loginPage = () => {
    navigate('/login');
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
        <Box textAlign="center" mb={2}>
          
           <Typography
                      variant="h4"
                      align="center"
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      IMDb
                    </Typography>
        </Box>

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
