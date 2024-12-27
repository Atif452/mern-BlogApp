import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send the email and password to the backend
      const response = await axios.post("http://localhost:8000/loginUser", {
        email,
        password,
      });

      // Handle successful login
      setMessage(response.data.message || "Login successful!");
      if(response.data.success) {
        navigate("/home")
      }
      console.log("Login response:", response.data);

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      // Handle login errors
      if (error.response) {
        setMessage(error.response.data.error || "Login failed!");
      } else {
        setMessage("Something went wrong!");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Typography>
          Don't have an account? Sign up{" "}
          <Button
            onClick={() => navigate("/signup")}
            variant="text"
            color="primary"
          >
            here
          </Button>{" "}
        </Typography>
      </form>
      {message && (
        <Typography
          variant="body2"
          color={message.includes("successful") ? "green" : "error"}
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </Paper>
  );
}

export default Login;
