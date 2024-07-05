import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get('https://employee-management-2-srno.onrender.com/auth/admins')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const maskPassword = (password) => {
    return '*'.repeat(password.length);
  };

  return (
    <div className="mt-3 overflow-auto">
    <h2 className="text-center mb-3">Admin List</h2>
    <div className="d-flex justify-content-center mb-5">
     
    <Link to='/admindashboard/add_admin' className="btn btn-success">Add Admin</Link>
    </div>
    <div className="overflow-x-auto">
    <table className="min-w-full tw-border tw-border-base-content">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Password</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={index} className="bg-white even:bg-gray-50">
              <td className="py-2 px-4 border-b">{admin.name}</td>
              <td className="py-2 px-4 border-b">{admin.email}</td>
              <td className="py-2 px-4 border-b">{maskPassword(admin.password)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default AdminList;
