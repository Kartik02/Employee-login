import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('https://backendemp.vercel.app/auth/employees')
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
    <div className="tw-mt-3 tw-bg-transparent">
      <h2 className="tw-text-center tw-mb-3">Employee List</h2>
      <table className="tw-table tw-table-bordered  tw-bg-transparent">
        <thead>
          <tr className="tw-bg-transparent">
            <th>Name</th>
            <th>Email</th>
            <th>Employee ID</th>
            <th>Salary</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="tw-bg-transparent">
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.employee_id}</td>
              <td>{employee.salary}</td>
              <td>{employee.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
