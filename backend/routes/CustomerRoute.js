const express = require("express");
const router = express.Router();
const {createCustomer, getCustomers} = require('../controllers/CustomerController')

router.post("/createcustomer", createCustomer);
router.get("/getcustomers", getCustomers)

module.exports = router;

