const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");
const mongoose = require('mongoose');

const createProduct = async (req, res) => {
    try {
      console.log('Request Body:', req.body);  // Log the request body
      const { name, description, purchasePrice, sellingPrice, category, supplier, quantity, photo } = req.body;
      if (!mongoose.Types.ObjectId.isValid(category) || !mongoose.Types.ObjectId.isValid(supplier)) {
        return res.status(400).json({ error: "Invalid Category or Supplier ID" });
      }
      const product = new Product({
        name,
        description,
        purchasePrice,
        sellingPrice,
        category,
        supplier,
        quantity,
        photo,
      });
      await product.save();
      res.status(201).json({ product });
    } catch (error) {
      console.error('Error creating product:', error);  // Log the error
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ error: "Server error" });
    }
  };
  

const getProducts = async (req, res) => {
    const product = await Product.find();
    res.json({product});
};

const getProductById = async (req, res) => {
    const pid = req.params.id;
    const product = await Product.findById(pid);
    res.json({product});
};

const updateProduct = async (req, res) => {
    const pid = req.params.id;
    const {
        name,
        description,
        purchasePrice,
        sellingPrice,
        category,
        supplier,
        quantity,
        photo,
    } = req.body;
    await Product.findByIdAndUpdate(pid, {
        name,
        description,
        purchasePrice,
        sellingPrice,
        category,
        supplier,
        quantity,
        photo,
    });
    const product = await Product.findById(sid);
    res.json({product});
};

const deleteProduct = asyncHandler(async (req, res) => {
    const pid = req.params.id;
    await Product.findByIdAndDelete(pid);
    res.json({ success: "Product Deleted"});
});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}