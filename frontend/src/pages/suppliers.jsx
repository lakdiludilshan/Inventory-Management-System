import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const suppliers = () => {
  const [suppliers, setSuppliers] = useState();
  const [createForm, setCreateForm] = useState({
    name: "",
    about: "",
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/suppliers/getsuppliers"
    );
    setSuppliers(res.data.supplier);
    console.log(res);
  };

  const handleCreateForm = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createSupplier = async (e) => {
    e.preventDefault();

    // create supplier
    const res = await axios.post(
      "http://localhost:5000/api/suppliers/createsupplier",
      createForm
    );
    toast.success("Supplier created successfully!");

    // update state
    setSuppliers([...suppliers, res.data.supplier]);

    // clear form state
    setCreateForm({
      name: "",
      about: "",
    });
  };

  const deleteSupplier = async (_id) => {
    // delete supplier
    const res = await axios.delete(
      `http://localhost:5000/api/suppliers/deletesupplier/${_id}`
    );
    toast.success("Supplier deleted successfully!");

    // update state
    const newSuppplierList = suppliers.filter((supplier) => {
      return supplier._id !== _id;
    });

    setSuppliers(newSuppplierList);
  };

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    name: "",
    about: "",
  });

  const handleUpdateForm = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (supplier) => {
    // set state on update form
    setUpdateForm({
      name: supplier.name,
      about: supplier.about,
      _id: supplier._id,
    });
  };

  const updateSupplier = async (e) => {
    e.preventDefault();

    const { name, about } = updateForm;

    // send the update requeset
    const res = await axios.put(
      `http://localhost:5000/api/suppliers/updatesupplier/${updateForm._id}`,
      {
        name,
        about,
      }
    );
    toast.success("Supplier updated successfully!");
    
    // update state
    const newSupplier = [...suppliers];
    const supplierIndex = suppliers.findIndex((supplier) => {
      return supplier._id === updateForm._id;
    });
    newSupplier[supplierIndex] = res.data.supplier;

    setSuppliers(newSupplier);

    // clear form state
    setUpdateForm({
      _id: null,
      name: "",
      about: "",
    });
  };

  return (
    <div>
      <h1 className="text-3xl">Supplier page</h1>
      <div className="flex flex-row">
        {/* Create Form */}
        {!updateForm._id && (
          <div className="flex flex-col w-1/2 border-2 border-black my-2 mx-2 px-2 py-2">
            <form onSubmit={createSupplier}>
              <div className="flex flex-col ">
                <h1 className="text-2xl">Create Supplier</h1>
                <label className="my-1 text-blue-700">
                  Enter Supplier Name
                </label>
                <input
                  name="name"
                  placeholder="Enter Supplier Name"
                  value={createForm.name}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                />
                <label className="my-1 text-blue-700">Supplier Details</label>
                <input
                  name="about"
                  placeholder="Enter Supplier Details"
                  value={createForm.about}
                  className="border border-slate-900 my-2"
                  onChange={handleCreateForm}
                />
                <button className="border border-blue-700 bg-blue-900  text-white">
                  {" "}
                  Create Supplier{" "}
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Update Form */}
        {updateForm._id && (
          <div className="flex flex-col w-1/2 border-2 border-black my-2 mx-2 px-2 py-2">
            <form onSubmit={updateSupplier}>
              <div className="flex flex-col ">
                <h1 className="text-2xl">Update Supplier</h1>
                <label className="my-1 text-blue-700">
                  Enter Supplier Name
                </label>
                <input
                  name="name"
                  placeholder="Enter Supplier Name"
                  value={updateForm.name}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                />
                <label className="my-1 text-blue-700">Supplier Details</label>
                <input
                  name="about"
                  placeholder="Enter Supplier Details"
                  value={updateForm.about}
                  className="border border-slate-900 my-2"
                  onChange={handleUpdateForm}
                />
                <button className="border border-blue-700 bg-blue-900 text-white">
                  {" "}
                  Update Supplier{" "}
                </button>
              </div>
            </form>
          </div>
        )}{" "}
      </div>

      {/* Fetch Suppliers */}
      <div className="py-3">
        <h2>Supplier list</h2>
        {suppliers &&
          suppliers.map((supplier) => {
            return (
              <div key={supplier._id}>
                <span>{supplier.name}</span>
                <span> - {supplier.about}</span>
                <button
                  onClick={() => toggleUpdate(supplier)}
                  className="mx-2 border border-blue-700 bg-green-900  text-white"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteSupplier(supplier._id)}
                  className="mx-2 border border-blue-700 bg-blue-900  text-white"
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default suppliers;
