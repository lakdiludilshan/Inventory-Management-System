const asyncHandler = require("express-async-handler");
const Customer = require("../models/CustomerModel");

const createCustomer = async (req, res) => {
  const { name, description } = req.body;
  const customer = await Customer.create({
    name,
    description,
  });
  res.json({ customer });
};

const getCustomers = async (req, res) => {
  const customer = await Customer.find();
  res.json({ customer: customer });
};

const getCustomerById = async (req, res) => {
  const cid = req.params.id;
  const customer = await Customer.findById(cid);
  res.json({ customer });
};

const updateCustomer = async (req, res) => {
  const cid = req.params.id;
  const { name, description } = req.body;
  await Customer.findByIdAndUpdate(cid, {
    name,
    description,
  });
  const customer = await Customer.findById(cid);
  res.json({ customer });
};

const deleteCustomer = async (req, res) => {
  const cid = req.params.id;
  await Customer.deleteOne({ id: cid });
  res.json({ success: "Record deleted" });
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
