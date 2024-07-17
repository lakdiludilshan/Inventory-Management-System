import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

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
    if(!customerName || !customerDescription) {
      toast.error("Fill all the required fields!");
      return;
    }

    axios.post("http://localhost:5000/api/customers/createcustomer",
      {
        name: customerName,
        description: customerDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      },
    )
    .then((response) => {
      toast.success("Customer created successfully!");
      fetchCustomers();
      setCustomerName("");
      setCustomerDescription("")
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

  return (
    <div className="flex flex-col w-1/2">
      <form action="">
        <div className="flex flex-col ">
          <h1 className="text-3xl">Customer page</h1>
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
          className="border border-blue-700 bg-blue-900"
          onClick={createCustomer}
          >
            {" "}
            Create Customer{" "}
          </button>
          <ToastContainer />
        </div>
      </form>

      <div className="py-4">
        <h2>Customer List</h2>
        {Array.isArray(customers) && customers.length > 0 ? (
          <ul>
            {customers.map((customer) => (
              <li key={customer._id}>
                <span>{customer.name}</span>
                <span>- {customer.description}</span>
                <button 
                onClick={() => customerDelete(customer._id)}
                className="mx-2 border border-blue-700 bg-blue-900"
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
      
    </div>
  );
};

export default customers;
