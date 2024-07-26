const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/ProductController");

router.post("/createproduct", createProduct);
router.get("/getproducts", getProducts);
router.get("/getproduct/:id", getProductById);
router.put("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;