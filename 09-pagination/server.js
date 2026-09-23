 require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Error:', err));

app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server port ${process.env.PORT} pe chal raha hai!`);
});