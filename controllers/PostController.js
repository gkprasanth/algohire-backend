import Post from "../models/post.js";
import BlogPost from "../models/post.js"
import User from "../models/user.js";
import sanitizeHtml from 'sanitize-html';
class PostController {
    static async createPost(req, res) {
        try {
            // Log the request body to see what data is being received
            console.log("Request Body:", req.body);

            // Extract data from the request body
            const { title, content, author, image, category } = req.body;
            // console.log(title)
            // Assuming you're also receiving an image file in the request



            // Create a new post object
            const newPost = new Post({
                title,
                content,
                author,
                image, category
            });
            const savedPost = await newPost.save();

            return res.status(201).json(savedPost);
        } catch (error) {
            console.error('Error creating post:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    static async getAllposts(req, res) {
        try {
            const posts = await Post.find();
            return res.status(200).json(posts); // Send the fetched posts as JSON response
        } catch (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ message: 'Internal server error' }); // Send an error response if fetching posts fails
        }
    }


    static async getSinglePost(req, res) {
        const { postId } = req.params;

        try {
            const post = await Post.findOne({ _id: postId });

            if (!post) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }
            const author = await User.findOne({ _id: post.author });
            // console.log(author)
            res.status(200).json({
                
                 
                    _id: post._id,
                    title: post.title,
                    content: post.content,
                    author: author.username,
                    authorId:post.author ,
                    publishedAt: post.createdAt,// Assuming publishedAt is a string in ISO 8601 format
                    image: post.image
                
            });
        } catch (error) {
            console.error("Error fetching post:", error);
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }
}

export default PostController