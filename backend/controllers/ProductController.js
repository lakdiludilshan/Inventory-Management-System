const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

const createProduct = async (req, res) => {
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
    const product = await Product.create({
        name,
        description,
        purchasePrice,
        sellingPrice,
        category,
        supplier,
        quantity,
        photo,
    })
    res.json({product});
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