const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            unique: true,
        },
        description: {
            type: String,
        },
        purchasePrice: {
            type: Number,
            required: [true, "Please enter purchase price of the product"],
        },
        sellingPrice: {
            type: Number,
            required: [true, "Please enter selling price of the product"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Please select a category']
        },
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: [true, 'Please select a supplier']
        },
        quantity: {
            type: Number,
            required: [true, "Please enter quantity of the product"],
        },
        photo: {
            type: String,
            required: [true, "Please provide a photo"],
            default: "empty-product.png",
        },
    }
)

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;