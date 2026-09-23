const express = require('express');
const router = express.Router();

//Controller se function lo 
const {createPost, getPosts} = require('../controllers/post.controller');

//Multer middleware lo
const upload = require('../middleware/upload');

//Routes
//upload.single('image) - ek image accept karo
//'image' -> field ka naam jo Thunder client mein doge

router.post('/', upload.single('image'), createPost);
router.get('/', getPosts);

module.exports = router;





