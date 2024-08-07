import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import defaultImage from '../assets/tencompany.jpg';
import { universalurl } from '../helper';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    employee_id: '',
    password: '',
    salary: '',
    category_id: '',
    image: null
  });
  const [category, setCategory] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get(`${universalurl}/auth/category`)
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

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('employee_id', employee.employee_id);
        formData.append('password', employee.password);
        formData.append('salary', employee.salary);
        formData.append('category_id', employee.category_id);
        
        if (employee.image) {
          formData.append('image', employee.image);
        } else {
          const blob = fetch(defaultImage)
            .then(res => res.blob())
            .then(blob => {
              formData.append('image', blob, 'default.png');
              submitFormData(formData);
            })
            .catch(err => console.log(err));
          return;
        }
        submitFormData(formData);
      }
    });
  };

  const submitFormData = (formData) => {
    axios.post(`${universalurl}/auth/add_employee`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(result => {
        console.log(result.data);
        Swal.fire(
          'Added!',
          'Employee has been added successfully.',
          'success'
        );
        setEmployee({
          name: '',
          email: '',
          employee_id: '',
          password: '',
          salary: '',
          category_id: '',
          image: null
        });
      })
      .catch(err => {
          Swal.fire(
            'Error!',
            'Duplicate data or Server issue, Try again.',
            'error'
          );
        console.log(err);
      });
  };

  const handleRemoveMessage = () => {
    setSuccessMessage('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
    <div className="p-2 rounded w-100 tw-border tw-border-base-content">
      {/* <h2 className="text-center">Add Employee</h2> */}
      <br />
      {successMessage && (
        <div className="alert alert-success d-flex align-items-center justify-content-between">
          <span>{successMessage}</span>
          <button className="btn-close" onClick={handleRemoveMessage}></button>
        </div>
      )}
      <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-md-6 mb-3">
          <label htmlFor="inputName" className="form-label">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control tw-placeholder-base-content rounded-0 tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
            placeholder="Enter Name"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="inputEmail4" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control tw-placeholder-base-content rounded-0 tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="inputEmail4" className="form-label">
            Employee ID <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control tw-placeholder-base-content rounded-0 tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
            id="inputEmployeeId"
            placeholder="Enter Employee ID"
            autoComplete="off"
            value={employee.employee_id}
            onChange={(e) => setEmployee({ ...employee, employee_id: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="inputPassword4" className="form-label">
            Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control tw-placeholder-base-content rounded-0 tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
            id="inputPassword4"
            placeholder="Enter password"
            value={employee.password}
            onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control tw-placeholder-base-content rounded-0 tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            value={employee.salary}
            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="category" className="form-label">Category <span className="text-danger">*</span></label>
          <select name="category" id="category" className="form-select" onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })} value={employee.category_id} required>
            <option value="">Select Category</option>
            {category.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="inputImage" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control rounded-0 tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
            id="inputImage"
            accept="image/*"
            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
          />
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
