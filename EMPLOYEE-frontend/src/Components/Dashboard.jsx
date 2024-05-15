import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";


const Dashboard = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('https://backendemp.vercel.app/auth/logout')
      .then(result => {
        if (result.data.Status) {
          navigate('adminlogin')
        }
      })
  }
  return (
    <div className="container-fluid hover">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark hover:bg-gray-900">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Employee MS
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle hover:text-primary"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              {/* <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-people ms-2"></i>

                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employee
                  </span>
                </Link>
              </li> */}
              {/* <li className="w-100">
                <Link
                  to="/dashboard/projects"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i class=" fs-4 bi bi-journal-text ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li> */}
              <li className="w-100">
                <Link
                  to="/dashboard/timesheet"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i class="fs-4 bi bi-calendar3 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"> Timesheet</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/timetracker"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i class=" fs-4 bi bi-clock ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"> TimeTracker</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/calender"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i class=" fs-4 bi bi-calendar ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Calendar</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/reports"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i class=" fs-4 bi bi-bar-chart-fill ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Report</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/projectmanagement"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i class="fs-4 bi bi-file-earmark ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Project</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employeesec"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i class=" fs-4 bi bi-journal-text ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"> Employee sec</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/leave"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi bi-house-heart ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leave</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link
                  to="/"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>

            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-md-end gap-4 fs-4 shadow">
            <button className="btn btn-secondary dropdown-toggle" type="button"
              id="dropdownMenubutton" toggle="dropdown">workspace


            </button>

            <i class="bi bi-envelope-plus-fill"></i>
            <i class="bi bi-bell-fill"></i>
            <i class="bi bi-question-circle"></i>
            <Link to="/dashboard/profile">
              <i class="bi bi-person-circle"></i>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
