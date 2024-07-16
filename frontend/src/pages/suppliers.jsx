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
    const res = await axios.get("http://localhost:5000/api/suppliers/getsuppliers");
    setSuppliers(res.data.supplier);
    console.log(res);
  };

  const updateCreateForm = (e) => {
    const {name, value} = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createSupplier = async (e) => {
    e.preventDefault();

    // create supplier
    const res = await axios.post("http://localhost:5000/api/suppliers/createsupplier", createForm);

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
    const res = await axios.delete(`http://localhost:5000/api/suppliers/deletesupplier/${_id}`)
    
    // update state
    const newSuppplierList = [...suppliers].filter((supplier) => {
      return supplier._id !== _id;
    });

    setSuppliers(newSuppplierList);
  };

  return (
    <div>
       <div className="flex flex-col w-1/2">
      <form onSubmit={createSupplier}>
        <div className="flex flex-col ">
          <h1 className="text-3xl">Supplier page</h1>
          <label className="my-1 text-blue-700">Enter Supplier Name</label>
          <input
            name="name"
            placeholder="Enter Supplier Name"
            value={createForm.name}
            className="border border-slate-900 my-2"
            onChange={updateCreateForm}
          />
          <label className="my-1 text-blue-700">Supplier Details</label>
          <input
            name="about"
            placeholder="Enter Supplier Details"
            value={createForm.about}
            className="border border-slate-900 my-2"
            onChange={updateCreateForm}
          />
          <button 
          className="border border-blue-700 bg-blue-900"
          
          >
            {" "}
            Create Supplier{" "}
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>

    <div className="py-3">
      <h2>Supplier list</h2>
      {suppliers && suppliers.map((supplier) => {
        return <div key={supplier._id}>
          <span>{supplier.name}</span>
          <span> - {supplier.about}</span>
          <button 
          onClick={() => deleteSupplier(supplier._id)}
          className="mx-2 border border-blue-700 bg-blue-900"
          >
            Delete
          </button>
          </div>
      })}
    </div>

    </div>
  )
}

export default suppliers
