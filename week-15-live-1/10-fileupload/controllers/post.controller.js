const Post = require('../models/Post');

// POST BANAO — image ke saath
const createPost = async (req, res) => {
  try {
    // req.file → multer ne image save ki
    // req.body → title aaya

    // Agar image nahi aayi
    if (!req.file) {
      return res.status(400).json({ message: 'Image zaroori hai!' });
    }

    // Image ka path save karo
    const imagePath = req.file.path;

    // Post banao DB mein
    const post = await Post.create({
      title: req.body.title,
      image: imagePath
    });

    res.status(201).json({
      message: 'Post ban gayi!',
      post
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//SARI POSTS LAAO
const getPosts = async (req, res) => {
  try{
    // DB se sari post laao
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      error: err.message });
  }
};

module.exports = {createPost, getPosts};