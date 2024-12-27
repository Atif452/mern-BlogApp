import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  CardActions,
  Divider,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Verified from "@mui/icons-material/Verified";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [activePostId, setActivePostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/getAllPosts");
        setPosts(data.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.put(
        `http://localhost:8000/${postId}/likePost`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;
    try {
      const { data } = await axios.put(
        `http://localhost:8000/${postId}/commentPost`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? { ...post, comments: data.comments } : post))
      );
      setCommentText("");
      setActivePostId(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "700px",
        margin: "auto",
        p: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {posts.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No posts available.
        </Typography>
      ) : (
        posts.map((post) => (
          <Card key={post._id} sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar src={post.user?.avatar} alt="User">
                  {post.user?.name?.[0]?.toUpperCase() || "U"}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1} textTransform="capitalize">
                    {post.user?.name || "Anonymous"}
                    {post.user?.isVerified ? <Verified color="primary" fontSize="20px" />: ""}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" mb={2}>
                {post.content}
              </Typography>
              {post.image && (
                <Box
                  component="img"
                  src={post.image}
                  alt="Post"
                  sx={{
                    width: "100%",
                    borderRadius: 1,
                    objectFit: "cover",
                    maxHeight: "600px",
                  }}
                />
              )}
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
              <Box display="flex" alignItems="center">
                <Tooltip title="Like">
                  <IconButton onClick={() => handleLike(post._id)}>
                    <FavoriteIcon color={post.liked ? "error" : "disabled"} />
                  </IconButton>
                </Tooltip>
                <Typography>{post.likes?.length || 0}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Tooltip title="Comment">
                  <IconButton onClick={() => setActivePostId(post._id)}>
                    <CommentIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Typography>{post.comments?.length || 0}</Typography>
              </Box>
            </CardActions>
            {activePostId === post._id && (
              <Box p={2} bgcolor="#f0f0f0">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleComment(post._id)}
                  disabled={!commentText.trim()}
                >
                  Submit
                </Button>
              </Box>
            )}
            {post.comments?.length > 0 && (
              <Box p={2} bgcolor="#f0f0f0" borderRadius="0 0 8px 8px" maxHeight="200px" overflow="scroll">
                {post.comments.map((comment) => (
                  <Box key={comment._id} mb={1}>
                    <Typography variant="body2" fontWeight="bold">
                      {comment.user?.name || "Anonymous"}:
                    </Typography>
                    <Typography variant="body2">{comment.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Card>
        ))
      )}
    </Box>
  );
};

export default AllPosts;
