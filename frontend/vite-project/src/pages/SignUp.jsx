import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate, useNavigation } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Message for success/error feedback


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending data to the backend
      const response = await axios.post("http://localhost:8000/newUser", {
        name,
        email,
        password,
      });

      // Set a success message
      setMessage(response.data.message || "Signup successful!");
      console.log("Signup successful:", response.data);
    } catch (error) {
      // Handle and log errors
      if (error.response) {
        // Backend error
        setMessage(error.response.data.error || "Signup failed!");
        console.error("Error response:", error.response.data);
      } else {
        // Network or other errors
        setMessage("Something went wrong!");
        console.error("Error:", error.message);
      }
    }

    // Log data for debugging
    console.log({ name, email, password });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit} style={{display:"flex" , flexDirection:"column", gap:10}}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Sign Up
        </Button>
        <Typography>
                  Already have account? Login{" "}
                  <Button
                    onClick={() => navigate("/")}
                    variant="text"
                    color="primary"
                  >
                    here
                  </Button>{" "}
                </Typography>
      </form>

      {/* Display feedback messages */}
      {message && (
        <Alert severity={message.includes("failed") ? "error" : "success"}>
          {message}
        </Alert>
      )}
    </Box>
  );
}

export default SignUp;
