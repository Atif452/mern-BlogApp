import Post from "../models/Post.js";



// export const newPost = async (req, res) => {
//     console.log("Request Body:", req.body); // Logs content data
//     console.log("Uploaded File:", req.file); // Logs file details
  
//     const { content } = req.body;
//     try {
//       const image = req.file ? req.file.path : null;
  
//       const post = await Post.save({
//         content,
//         image,
//         user: req.user._id,
//       });
  
//       res.json({
//         success: true,
//         message: "Post created successfully",
//         post,
//       });
//     } catch (error) {
//       console.error("Error creating post:", error);
//       res.status(500).json({
//         success: false,
//         message: "Error creating post",
//         error: error.message,
//       });
//     }
//   };
  

export const newPost = async (req, res) => {
    const {content} = req.body
    try {
      const image = req.file ? req.file.path : null;
        const post = await Post.create({content,image, user:req.user.id});
            // await post.save()
            res.status(201).json({success: true, message:"post saved successfully", post    });

    } catch (error) {
        res.status(500).json({success:false,
             message: 'Server Error' });
    }
}


export const getAllPosts = async (req, res) => {
    try {
        // Populate the 'user' field with 'name'
        const posts = await Post.find()
            .sort({ date: -1 })
            .populate("user")
            .populate("comments.user", "name")
             // Populate only the 'name' field from the User schema
        
        res.json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, message: "Server Error" });
    }
};


export const likePost=  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.likes.includes(req.user.id)) {
        post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
      } else {
        post.likes.push(req.user.id);
      }
      await post.save();
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  export const commentPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      // Create the new comment object
      const comment = {
        text: req.body.text,
        user: req.user.id, // Assuming req.user.id is the ID of the logged-in user
      };
  
      // Push the new comment to the post
      post.comments.push(comment);
  
      // Save the updated post with the new comment
      await post.save();
  
      // Populate the comment's user data after saving the comment
      const populatedPost = await Post.findById(req.params.id)
        .populate("comments.user", "name");
  
      res.status(200).json(populatedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  