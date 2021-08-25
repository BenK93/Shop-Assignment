const { Product } = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    //  if User is not admin
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not admin" });
    }
    const { name, price } = req.body;
    if (!name || !price) {
      res.status(400).json({ error: "name/price values are missing" });
    }
    const product = { name: name, price: price };
    const response = await Product.create(product);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
