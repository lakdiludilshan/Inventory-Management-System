import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import Modal from "./modal";

const cookies = new Cookies();

const customers = () => {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerDescription, setCustomerDescription] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/customers/getcustomers"
      );
      setCustomers(res.data.customer);
      console.log(res);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to load customers!");
    }
  };

  const createCustomer = () => {
    if (!customerName || !customerDescription) {
      toast.error("Fill all the required fields!");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/customers/createcustomer",
        {
          name: customerName,
          description: customerDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        toast.success("Customer created successfully!");
        fetchCustomers();
        setCustomerName("");
        setCustomerDescription("");
      })
      .catch((error) => {
        console.error("Error creating customer", error);
        toast.error("Failed to create customer");
      });
  };

  const customerDelete = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/customers/deletecustomer/${_id}`
      );
      toast.success("Customer deleted successfully!");
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer");
    }
  };

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    name: "",
    description: "",
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (customer) => {
    //set state on the update form
    setUpdateForm({
      _id: customer._id,
      name: customer.name,
      description: customer.description,
    });
  };

  const updateCustomer = async (e) => {
    e.preventDefault();

    const { name, description } = updateForm;

    // send the update request
    const res = await axios.put(
      `http://localhost:5000/api/customers/updatecustomer/${updateForm._id}`,
      {
        name,
        description,
      }
    );
    toast.success("Customer updated successfully!");

    //update state
    const newCustomer = [...customers];
    const customerIndex = customers.findIndex((customer) => {
      return customer._id === updateForm._id;
    });
    newCustomer[customerIndex] = res.data.customer;

    setCustomers(newCustomer);

    //clear form State
    setUpdateForm({
      _id: null,
      name: "",
      description: "",
    });
  };

  return (
    <div>
      <h1 className="text-3xl">Customer page</h1>
      {!updateForm._id && (<div className="flex flex-col w-1/2 border-2 border-black my-2 mx-2 px-2 py-2">
      <form action="">
        <div className="flex flex-col ">
          <h1 className="text-2xl">Create Customer</h1>
          <label className="my-1 text-blue-700">Enter Customer Name</label>
          <input
            type="text"
            placeholder="Enter Customer Name"
            value={customerName}
            className="border border-slate-900 my-2"
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <label className="my-1 text-blue-700">Customer Details</label>
          <input
            type="text"
            placeholder="Enter Customer Details"
            value={customerDescription}
            className="border border-slate-900 my-2"
            onChange={(e) => setCustomerDescription(e.target.value)}
          />
          <button
            className="border border-blue-700 bg-blue-900 text-white"
            onClick={createCustomer}
          >
            {" "}
            Create Customer{" "}
          </button>
          <ToastContainer />
        </div>
      </form>
      </div>)}
      {/* Update Form */}
      {updateForm._id && (
        <div className="flex flex-col w-1/2 border-2 border-black my-2 mx-2 px-2 py-2">
          <form onSubmit={updateCustomer}>
            <div className="flex flex-col ">
              <h1 className="text-2xl">Update Customer</h1>
              <label className="my-1 text-blue-700">Enter Customer Name</label>
              <input
                name="name"
                placeholder="Enter Customer Name"
                value={updateForm.name}
                className="border border-slate-900 my-2"
                onChange={handleUpdate}
              />
              <label className="my-1 text-blue-700">Customer Details</label>
              <input
                name="description"
                placeholder="Enter Customer Details"
                value={updateForm.description}
                className="border border-slate-900 my-2"
                onChange={handleUpdate}
              />
              <button className="border border-blue-700 bg-blue-900 text-white">
                {" "}
                Update Customer{" "}
              </button>
            </div>
          </form>
        </div>
      )}{" "}

      <Modal>
      <div className="py-4">
        <h2>Customer List</h2>
        {Array.isArray(customers) && customers.length > 0 ? (
          <ul>
            {customers.map((customer) => (
              <li key={customer._id}>
                <span>{customer.name}</span>
                <span>- {customer.description}</span>
                {/* Update Button */}
                <button
                  onClick={() => toggleUpdate(customer)}
                  className="mx-2 border border-blue-700 bg-green-900 text-white"
                >
                  Update
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => customerDelete(customer._id)}
                  className="mx-2 border border-blue-700 bg-blue-900 text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No customers available.</p>
        )}
      </div>
      </Modal>
    </div>
  );
};

export default customers;
