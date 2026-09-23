// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Error:', err));

// Routes use karo
app.use('/api/auth', authRoutes);

// Server start
app.listen(process.env.PORT, () => {
  console.log(`Server port ${process.env.PORT} pe chal raha hai!`);
})