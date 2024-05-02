import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://employee-login-alpha.vercel.app/admin/", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employeesec");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-75 ">
      <div className="p-3 rounded w-65 border ">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">
              <strong>Category:</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="enter category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control rounded 0"
            />
          </div>

          <button className="btn btn-success w-100 rounded 0">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
