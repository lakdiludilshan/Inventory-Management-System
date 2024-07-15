const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: String,
    description: String
})

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;