const asyncHandler = require("express-async-handler");
const Customer = require("../models/CustomerModel");

const createCustomer = async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    const customer = await Customer.create({
        name: name,
        description: description,
    })

    res.json({ customer: customer})
}

const getCustomers = async (req, res) => {
    
    const customer = await Customer.find();

    res.json({customer: customer});
}

module.exports = {
    createCustomer,
    getCustomers
};