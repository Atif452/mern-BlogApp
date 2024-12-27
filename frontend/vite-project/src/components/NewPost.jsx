import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

function NewPost() {
  const [content, setContent] = useState(""); // For the content field
  const [image, setImage] = useState(null); // For the uploaded file
  const [message, setMessage] = useState(""); // Feedback message
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure content and image are provided
    // if (!content || !image) {
    //   setMessage("Please provide content and an image.");
    //   return;
    // }

    setLoading(true);
    setMessage("");

    try {
      // Use FormData to handle file uploads
      const formData = new FormData();
      formData.append("content", content); // Append the content field
      formData.append("image", image); // Append the image file

      const response = await axios.post(
        "http://localhost:8000/newPost", // Your backend endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Authentication token
          },
        }
      );

      // Handle success
      if (response.data.success) {
        setMessage("Post created successfully!");
        setContent("");
        setImage(null); // Reset form fields
      } else {
        setMessage("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error creating post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        margin: "50px auto",
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create a New Post
      </Typography>

      {/* Form for adding a new post */}
      <form onSubmit={handleSubmit}>
        {/* Content Input */}
        <Box mb={2}>
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            required
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>

        {/* Image Upload */}
        <Box mb={2}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            color="secondary"
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])} // Update the image state
              accept="image/*" // Accept only image files
            />
          </Button>
          {image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected File: {image.name}
            </Typography>
          )}
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading} // Disable button when loading
        >
          {loading ? "Posting..." : "Create Post"}
        </Button>
      </form>

      {/* Feedback Message */}
      {message && (
        <Typography
          variant="body2"
          color={message.includes("success") ? "green" : "error"}
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </Paper>
  );
}

export default NewPost;
