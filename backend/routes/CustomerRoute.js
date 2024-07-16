const express = require("express");
const router = express.Router();
const {createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer} = require('../controllers/CustomerController')

router.post("/createcustomer", createCustomer);
router.get("/getcustomers", getCustomers);
router.get("/getcustomer/:id", getCustomerById);
router.put("/updatecustomer/:id", updateCustomer);
router.delete("/deletecustomer/:id", deleteCustomer);

module.exports = router;

