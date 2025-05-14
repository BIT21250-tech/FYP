import Post from '../models/Post.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .populate('comments.author', 'name')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate('comments.author', 'name');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    const post = await Post.create({
      title,
      content,
      tags: tags || [],
      author: req.user._id
    });
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name');
    
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.comments.push({
      content,
      author: req.user._id
    });
    
    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name')
      .populate('comments.author', 'name');
    
    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like/unlike post
// @route   PUT /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if post is already liked
    const alreadyLiked = post.likes.includes(req.user._id);
    
    if (alreadyLiked) {
      // Remove like
      post.likes = post.likes.filter(like => like.toString() !== req.user._id.toString());
    } else {
      // Add like
      post.likes.push(req.user._id);
    }
    
    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name')
      .populate('comments.author', 'name');
    
    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};