import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import Swal from "sweetalert2";
import request from "../utils/request";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  async function handleCredentialResponse(response) {
    try {
      const { data } = await request({
        method: "post",
        url: "/api/google-login",
        headers: {
          google_token: response.credential,
        },
      });

      // Handle successful login response
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id)
      localStorage.setItem("username", data.username);

      Swal.fire({
        title: "Good job!",
        text: "Login Success!",
        icon: "success",
      });

      nav("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }

  useEffect(() => {
    window.google.accounts?.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts?.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } 
    );
    window.google.accounts?.id.prompt();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await request({
        method: "post",
        url: "/api/login",
        data: input,
      });

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("username", response.data.username);

      setInput({
        email: "",
        password: "",
      });

      nav("/");

      Swal.fire({
        title: "Good job!",
        text: "Login Success!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            required
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            name="email" // Added name attribute
            value={input.email}
            onChange={handleInput}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            name="password" // Added name attribute
            value={input.password}
            onChange={handleInput}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body1" sx={{ mx: 2 }}>
              Or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center", // Center horizontally
            }}
            id="buttonDiv"
          ></div>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
