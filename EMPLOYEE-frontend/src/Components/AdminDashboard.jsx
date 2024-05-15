import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("https://backendemp.vercel.app/auth/logout").then((result) => {
      if (result.data.Status) {
        navigate("adminlogin");
      }
    });
  };
  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
        <div className="col-md-3 col-lg-2 bg-dark px-0">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/admindashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Admin Panel
              </span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0">
              <li>
                <Link
                  to="/admindashboard/employee"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-people me-2"></i>
                  <span className="d-none d-sm-inline">Manage Employee</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admindashboard/employeelist"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-people me-2"></i>
                  <span className="d-none d-sm-inline">Employee Details</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admindashboard/addproject"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-people me-2"></i>
                  <span className="d-none d-sm-inline">Add Project</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admindashboard/tag"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi bi-tag me-2"></i>
                  <span className="d-none d-sm-inline">Tag</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admindashboard/CreateMeeting"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi bi-tag me-2"></i>
                  <span className="d-none d-sm-inline">Create Meeting</span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link
                  to="/adminlogin"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-power me-2"></i>
                  <span className="d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9 col-lg-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
