import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { universalurl } from '../helper';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

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

  return (
    <div className="mt-3 overflow-auto">
    <h2 className="text-center mb-3">Employee List</h2>
    <div className="d-flex justify-content-center mb-5">
     
    <Link to='/admindashboard/add_employee' className="btn btn-success">Add Employee</Link>
    </div>
    <div className="overflow-x-auto">
    <table className="min-w-full tw-border tw-border-base-content">
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
