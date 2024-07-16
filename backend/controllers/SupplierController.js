const Supplier = require("../models/SupplierModel");

const createSupplier = async (req, res) => {
  const { name, about } = req.body;
  const supplier = await Supplier.create({
    name,
    about,
  });
  res.json({ supplier });
};

const getSuppliers = async (req, res) => {
  const supplier = await Supplier.find();
  res.json({ supplier });
};

const getSupplierById = async (req, res) => {
  const sid = req.params.id;
  const supplier = await Supplier.findById(sid);
  res.json({ supplier });
};

const updateSupplier = async (req, res) => {
    const sid = req.params.id;
    const {name, about} = req.body;
    await Supplier.findByIdAndUpdate(sid, {
        name,
        about
    });
    const supplier = await Supplier.findById(sid);
    res.json({supplier});
};

const deleteSupplier = async (req, res) => {
    const sid = req.params.id;
    await Supplier.deleteOne({id: sid});
    res.josn({ success: "Supplier Deleted"});
};

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
};
