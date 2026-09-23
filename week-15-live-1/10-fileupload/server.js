require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const postRoutes = require('./routes/post.routes');

const app = express();
app.use(express.json());

// Static files serve karo — images browser mein dikhengi
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Error:', err));

// Routes
app.use('/api/posts', postRoutes);

// Server start
app.listen(process.env.PORT, () => {
  console.log(`Server port ${process.env.PORT} pe chal raha hai!`);
});