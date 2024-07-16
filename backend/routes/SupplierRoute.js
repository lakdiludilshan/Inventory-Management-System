const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/SupplierController");

router.post("/createsupplier", createSupplier);
router.get("/getsuppliers", getSuppliers);
router.get("/getsupplier/:id", getSupplierById);
router.put("/updatesupplier/:id", updateSupplier);
router.delete("/deletesupplier/:id", deleteSupplier);

module.exports = router;
