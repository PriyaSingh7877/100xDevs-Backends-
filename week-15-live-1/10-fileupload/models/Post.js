const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  
  // Post ka title
  title: { 
    type: String, 
    required: true 
  },

  // Image ka path — uploads/123456-photo.jpg
  image: { 
    type: String, 
    required: true 
  },

  // Kab banaya
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;