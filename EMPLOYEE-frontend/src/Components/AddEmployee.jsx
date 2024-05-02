import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    employee_id: '',
    password: '',
    salary: '',
    category_id: '',
  });
  const [category, setCategory] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee.category_id) {
      setSuccessMessage('Select category');
      return;
    }
    axios.post('http://localhost:5000/api/add_employee', employee)
      .then(result => {
        console.log(result.data);
        setSuccessMessage('Employee added successfully');
        setEmployee({
          name: '',
          email: '',
          employee_id: '',
          password: '',
          salary: '',
          category_id: '',
        });
      })
      .catch(err => console.log(err));
  };

  const handleRemoveMessage = () => {
    setSuccessMessage('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h2 className="text-center">Add Employee</h2>
        {successMessage && (
          <div className="alert alert-success d-flex align-items-center justify-content-between">
            <span>{successMessage}</span>
            <button className="btn-close" onClick={handleRemoveMessage}></button>
          </div>
        )}
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Employee ID <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEmployeeId"
              placeholder="Enter Employee ID"
              autoComplete="off"
              value={employee.employee_id}
              onChange={(e) => setEmployee({ ...employee, employee_id: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter password"
              value={employee.password}
              onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">Category <span className="text-danger">*</span></label>
            <select name="category" id="category" className="form-select" onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })} value={employee.category_id} required>
              <option value="">Select Category</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
              <option value="HR">HR-Section</option>
              <option value="Tech">Tech-Section</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

