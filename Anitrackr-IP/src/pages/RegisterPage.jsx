import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import request from "../utils/request";
import { useState } from "react";

const RegisterPage = () => {
  const [input, setInput] = useState({
    username: "",
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

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await request({
        method: "post",
        url: "/api/register",
        data: input,
      });

      setInput({
        username: "",
        email: "",
        password: "",
      });

      Swal.fire({
        title: "Good job!",
        text: "You has been registered!",
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
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            required
            fullWidth
            label="Username"
            margin="normal"
            variant="outlined"
            name="username"
            value={input.username}
            onChange={handleInput}
          />
          <TextField
            required
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            name="email"
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
            name="password"
            value={input.password}
            onChange={handleInput}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
