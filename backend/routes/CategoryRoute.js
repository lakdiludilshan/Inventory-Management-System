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

router.post("/createcategory", protect, createCategory);
router.get("/getcategories", protect, getCategories);
router.get("/getcategory/:id", getCategoryById);
router.put("/updatecategory/:id", protect, updateCategory);
router.delete("/deletecategory/:id", protect, deleteCategory);

module.exports = router;
