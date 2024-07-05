import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { universalurl } from '../helper';
import AddEmployee from "./AddEmployee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`${universalurl}/auth/employees`)
      .then(result => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);
  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false); 
  };
  return (
    <div className="mt-3 overflow-auto">
    <div className="d-flex justify-content-end tw-mb-5 tw-mt-3">
      <button onClick={handleClick} className="btn btn-success">Add Employee</button>
    </div>
  
    {showModal && (
      <div className="modal fade show d-block" style={{ display: 'block' }} onClick={handleClose}>
        <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Employee</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <AddEmployee />
            </div>
          </div>
        </div>
      </div>
    )}

    
    <div className="overflow-x-auto">
    <table className="tw-min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Employee ID</th>
            <th className="py-2 px-4 border-b">Salary</th>
            <th className="py-2 px-4 border-b">Category</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="bg-white even:bg-gray-50">
              <td className="py-2 px-4 border-b">{employee.name}</td>
              <td className="py-2 px-4 border-b">{employee.email}</td>
              <td className="py-2 px-4 border-b">{employee.employee_id}</td>
              <td className="py-2 px-4 border-b">{employee.salary}</td>
              <td className="py-2 px-4 border-b">{employee.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default EmployeeList;
