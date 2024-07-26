const express = require("express");
const protect = require("../middleware/AuthMiddleware");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");
const router = express.Router();

router.post("/createcategory", createCategory);
router.get("/getcategories", getCategories);
router.get("/getcategory/:id", getCategoryById);
router.put("/updatecategory/:id",updateCategory);
router.delete("/deletecategory/:id",  deleteCategory);

module.exports = router;
