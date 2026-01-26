import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (data) => {
    console.log(data);
  };

  const RegisterPage = () => {
    navigate('/register');
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
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
            IMDb
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

          {/* Terms */}
          {/* <Typography variant="body2" sx={{ mt: 2, fontSize: "12px" }}>
            By continuing, you agree to IMDb's Conditions of Use and Privacy
            Policy.
          </Typography> */}

          {/* Divider */}
          <Divider sx={{ my: 3 }}>New to IMDb?</Divider>

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
            Create your IMDb account
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login