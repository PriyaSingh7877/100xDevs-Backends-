
const Product = require('../models/Product');

//GET ALL PRODUCTS - WITH PAGINATION
const getProducts = async (req, res) => {
  try {
    const page     = parseInt(req.query.page)  || 1;
    const limit    = parseInt(req.query.limit) || 5;
    const skip     = (page - 1) * limit;
    const search   = req.query.search   || '';
    const category = req.query.category || '';

    // Filter object banao
    const filter = {};

    // Search — name mein dhundho
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).skip(skip).limit(limit);
    const total    = await Product.countDocuments(filter);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//ADD PRODUCT
const addProduct = async (req, res) => {
  try{
    const { name, price, category } = req.body;
    const product = await Product.create({ name, price, category});
    res.status(201).json({ message: 'Product added!!!', product});
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
};

module.exports = {getProducts, addProduct};                                                                 