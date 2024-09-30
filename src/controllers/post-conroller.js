import Post from '../models/Post.js';

export const createPost = async (req, res) => {
    const post = new Post({ text: req.body.text, user: req.user.id });
    await post.save();
    res.status(201).json(post);
};

export const getPosts = async (req, res) => {
    const posts = await Post.find().populate('user', 'nickname email');
    res.json(posts);
};

export const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user.id) return res.sendStatus(403);
    
    post.text = req.body.text;
    await post.save();
    res.json(post);
};

export const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user.id) return res.sendStatus(403);
    
    await post.remove();
    res.sendStatus(204);
};