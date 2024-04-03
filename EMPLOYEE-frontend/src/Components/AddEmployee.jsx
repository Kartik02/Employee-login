import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
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
    axios.post('http://localhost:3000/auth/add_employee', employee)
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 ">
      <div className="p-3 rounded w-50 border ">
        <h2 className="text-center">Add Employee</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Name"
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
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Employee ID <span className="text-danger">*</span>
            </label>
            <input
              type="employee_id"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Employee_id"
              autoComplete="off"
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
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
          </div>
          <div className="col-12">
  <label htmlFor="category" className="form-label">Category <span className="text-danger">*</span></label>
  <select name="category" id="category" className="form-select" onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })} required>
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
