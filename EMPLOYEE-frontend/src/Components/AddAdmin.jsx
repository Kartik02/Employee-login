import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { universalurl } from '../helper';

const AddAdmin = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('name', admin.name);
        formData.append('email', admin.email);
        formData.append('password', admin.password);

        axios.post(`${universalurl}/auth/add_admin`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(result => {
            console.log(result.data);
            Swal.fire(
              'Added!',
              'Admin has been added successfully.',
              'success'
            );
            setAdmin({
              name: '',
              email: '',
              password: '',
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
      }
    });
  };

  const handleRemoveMessage = () => {
    setSuccessMessage('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
    <div className="p-3 rounded w-100 tw-border tw-border-base-content">
     
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
            value={admin.name}
            onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
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
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
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
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">
            Add Admin
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddAdmin;
