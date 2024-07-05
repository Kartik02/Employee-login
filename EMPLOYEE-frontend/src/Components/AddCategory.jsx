import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { universalurl } from "../helper";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!category.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Category cannot be empty.",
      });
      return;
    }

    try {
      const response = await axios.post(`${universalurl}/auth/add_category`, { category });
      if (response.data.Status) {
        Swal.fire({
          icon: "success",
          title: "Category Added",
          text: "Category has been successfully added.",
        }).then(() => {
          navigate("/dashboard/employeesec");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.Error || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error("Error adding category:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="p-3 rounded w-75 border">
        <h2 className="mb-4">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category"><strong>Category:</strong></label>
            <input
              type="text"
              name="category"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
