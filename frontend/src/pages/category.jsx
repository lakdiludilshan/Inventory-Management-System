// Category.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/api/categories/getcategories", {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories!");
      });
  };

  const createCategory = () => {
    if (!categoryName) {
      toast.error("Category name cannot be empty!");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/categories/createcategory",
        {
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`, // Send token in Authorization header
          },
        }
      )
      .then((response) => {
        toast.success("Category created successfully!");
        fetchCategories(); // Refresh categories list
        setCategoryName(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        toast.error("Failed to create category!");
      });
  };

  return (
    <div>
      <h1>Category</h1>
      <p>Create a new category</p>
      <input
        type="text"
        placeholder="Enter category name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
       <button 
          className="border border-blue-700 bg-blue-900"
          onClick={createCategory}
          >
            {" "}
            Create Customer{" "}
          </button>
      <ToastContainer />
      <div>
      <h2>Categories List</h2>
      {Array.isArray(categories) && categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
    </div>
  );
};

export default Category;
