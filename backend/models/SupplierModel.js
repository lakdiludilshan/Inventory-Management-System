const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: String,
    about: String
})

const Supplier = mongoose.model("suppliers", supplierSchema );

module.exports = Supplier;