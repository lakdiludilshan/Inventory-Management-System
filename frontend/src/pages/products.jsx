import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    purchasePrice: 0,
    sellingPrice: 0,
    category: "",
    supplier: "",
    quantity: 0,
    photo: "empty-product.png",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    name: "",
    description: "",
    purchasePrice: 0,
    sellingPrice: 0,
    category: "",
    supplier: "",
    quantity: 0,
    photo: "empty-product.png",
  });

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories/getcategories');
      setCategories(res.data);
    } catch (error) {
      toast.error("Error fetching categories.");
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/suppliers/getsuppliers');
      setSuppliers(res.data.supplier);
    } catch (error) {
      toast.error("Error fetching suppliers.");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/getproducts');
      setProducts(res.data.product);
    } catch (error) {
      toast.error("Error fetching products.");
    }
  };

  const handleCreateForm = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const handleUpdateForm = (e) => {
    const { name, value } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const validateForm = (form) => {
    const { category, supplier, photo } = form;
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    if (!objectIdPattern.test(category) || !objectIdPattern.test(supplier)) {
      toast.error("Please select valid Category and Supplier.");
      return false;
    }
    if (!photo || photo.trim() === "") {
      toast.error("Please provide a photo URL.");
      return false;
    }
    return true;
  };

  const createProduct = async (e) => {
    e.preventDefault();
    if (!validateForm(createForm)) {
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/products/createproduct", createForm);
      toast.success("Product created successfully!");
      setProducts([...products, res.data]);
      setCreateForm({
        name: "",
        description: "",
        purchasePrice: 0,
        sellingPrice: 0,
        category: "",
        supplier: "",
        quantity: 0,
        photo: "empty-product.png",
      });
    } catch (error) {
      toast.error("Error creating product.");
    }
  };

  const deleteProduct = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/deleteproduct/${_id}`);
      toast.success("Product deleted successfully!");
      setProducts(products.filter(product => product._id !== _id));
    } catch (error) {
      toast.error("Error deleting product.");
    }
  };

  const toggleUpdate = (product) => {
    setUpdateForm({
      _id: product._id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      category: product.category,
      supplier: product.supplier,
      quantity: product.quantity,
      photo: product.photo,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    if (!validateForm(updateForm)) {
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/products/updateproduct/${updateForm._id}`, updateForm);
      toast.success("Product updated successfully!");
      const updatedProducts = products.map(product => product._id === updateForm._id ? res.data : product);
      setProducts(updatedProducts);
      setUpdateForm({
        _id: null,
        name: "",
        description: "",
        purchasePrice: 0,
        sellingPrice: 0,
        category: "",
        supplier: "",
        quantity: 0,
        photo: "empty-product.png",
      });
    } catch (error) {
      toast.error("Error updating product.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Product Management</h1>
      <div className="flex flex-row">
        {/* Create Form */}
        {!updateForm._id && (
          <div className="flex flex-col w-1/2 border-2 border-black my-2 mx-2 px-2 py-2">
            <form onSubmit={createProduct}>
              <div className="flex flex-col">
                <h1 className="text-2xl">Create Product</h1>
                <label className="my-1 text-blue-700">Product Name</label>
                <input
                  name="name"
                  placeholder="Enter Product Name"
                  value={createForm.name}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                />
                <label className="my-1 text-blue-700">Description</label>
                <input
                  name="description"
                  placeholder="Enter Product Description"
                  value={createForm.description}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                />
                <label className="my-1 text-blue-700">Purchase Price</label>
                <input
                  name="purchasePrice"
                  placeholder="Enter Purchase Price"
                  type="number"
                  value={createForm.purchasePrice}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                />
                <label className="my-1 text-blue-700">Selling Price</label>
                <input
                  name="sellingPrice"
                  placeholder="Enter Selling Price"
                  type="number"
                  value={createForm.sellingPrice}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                />
                <label className="my-1 text-blue-700">Category</label>
                <select
                  name="category"
                  value={createForm.category}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <label className="my-1 text-blue-700">Supplier</label>
                <select
                  name="supplier"
                  value={createForm.supplier}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                >
                  <option value="" disabled>
                    Select Supplier
                  </option>
                  {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                <label className="my-1 text-blue-700">Quantity</label>
                <input
                  name="quantity"
                  placeholder="Enter Quantity"
                  type="number"
                  value={createForm.quantity}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                />
                <label className="my-1 text-blue-700">Photo</label>
                <input
                  name="photo"
                  placeholder="Enter Photo URL"
                  value={createForm.photo}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                />
                <button className="border border-blue-700 bg-blue-900 text-white">Create Product</button>
              </div>
            </form>
          </div>
        )}
        {/* Update Form */}
        {updateForm._id && (
          <div className="flex flex-col w-1/2 border-2 border-black my-2 mx-2 px-2 py-2">
            <form onSubmit={updateProduct}>
              <div className="flex flex-col">
                <h1 className="text-2xl">Update Product</h1>
                <label className="my-1 text-blue-700">Product Name</label>
                <input
                  name="name"
                  placeholder="Enter Product Name"
                  value={updateForm.name}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                />
                <label className="my-1 text-blue-700">Description</label>
                <input
                  name="description"
                  placeholder="Enter Product Description"
                  value={updateForm.description}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                />
                <label className="my-1 text-blue-700">Purchase Price</label>
                <input
                  name="purchasePrice"
                  placeholder="Enter Purchase Price"
                  type="number"
                  value={updateForm.purchasePrice}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                />
                <label className="my-1 text-blue-700">Selling Price</label>
                <input
                  name="sellingPrice"
                  placeholder="Enter Selling Price"
                  type="number"
                  value={updateForm.sellingPrice}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                />
                <label className="my-1 text-blue-700">Category</label>
                <select
                  name="category"
                  value={updateForm.category}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <label className="my-1 text-blue-700">Supplier</label>
                <select
                  name="supplier"
                  value={updateForm.supplier}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                >
                  <option value="" disabled>
                    Select Supplier
                  </option>
                  {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                <label className="my-1 text-blue-700">Quantity</label>
                <input
                  name="quantity"
                  placeholder="Enter Quantity"
                  type="number"
                  value={updateForm.quantity}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                />
                <label className="my-1 text-blue-700">Photo</label>
                <input
                  name="photo"
                  placeholder="Enter Photo URL"
                  value={updateForm.photo}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                />
                <button className="border border-blue-700 bg-blue-900 text-white">Update Product</button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Fetch Products */}
      <div className="py-3">
        <h2>Product List</h2>
        {products &&
          products.map((product) => (
            <div key={product._id}>
              <span>{product.name}</span>
              <span> - {product.description}</span>
              <span> - ${product.purchasePrice}</span>
              <span> - ${product.sellingPrice}</span>
              <span> - {product.quantity}</span>
              <button
                onClick={() => toggleUpdate(product)}
                className="mx-2 border border-blue-700 bg-green-900 text-white"
              >
                Update
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="mx-2 border border-blue-700 bg-blue-900 text-white"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;
