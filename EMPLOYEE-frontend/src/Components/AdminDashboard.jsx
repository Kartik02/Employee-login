import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const handleLogout = () => {
    axios.get("https://employee-management-2-srno.onrender.com/auth/logout").then((result) => {
      if (result.data.Status) {
        navigate("adminlogin");
      }
    });
  };

  const handleNavClick = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  return (
    <div className="container-fluid min-vh-100 tw-bg-base-300 tw-text-base-content">
      <div className="row flex-nowrap ">
        <div className="col-auto col-2 col-md-3 col-xl-2 px-0 tw-h-screen overflow-y-auto sm:h-full">
          <div className="d-flex bg-dark col-2 col-md-3 col-xl-2 px-sm-2 px-0 flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 tw-fixed sm:tw-h-full">
            <Link
              to="/admindashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none tw-text-xs md:tw-text-xl"
            >
              <span className="fs-9 fw-bolder d-none d-sm-inline">Admin Panel</span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className={`w-100 hover:tw-bg-gray-300 tw-rounded ${activeLink === "/admindashboard" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/admindashboard"
                  className={`nav-link ${activeLink === "/admindashboard" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/admindashboard')}
                >
                  <i className="fs-9 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              
              <li className={`w-100 hover:tw-bg-gray-300 tw-rounded ${activeLink === "/admindashboard/adminlist" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/admindashboard/adminlist"
                  className={`nav-link ${activeLink === "/admindashboard/adminlist" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/admindashboard/adminlist')}
                >
                 <i class="bi bi-person-check ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Admin Details</span>
                </Link>
              </li>

              <li className={`w-100 hover:tw-bg-gray-300 tw-rounded ${activeLink === "/admindashboard/employeelist" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/admindashboard/employeelist"
                  className={`nav-link ${activeLink === "/admindashboard/employeelist" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/admindashboard/employeelist')}
                >
                  <i className="fs-9 bi bi-card-list ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Employee Details</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 tw-rounded ${activeLink === "/admindashboard/employeesec" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/admindashboard/employeesec"
                  className={`nav-link ${activeLink === "/admindashboard/employeesec" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/admindashboard/employeesec')}
                >
                  <i className="bi bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Employee Sec</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 tw-rounded ${activeLink === "/admindashboard/projectmanagement" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/admindashboard/projectmanagement"
                  className={`nav-link ${activeLink === "/admindashboard/projectmanagement" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/admindashboard/projectmanagement')}
                >
                  <i className="fs-9 bi bi-file-earmark ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Project</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 tw-rounded ${activeLink === "/admindashboard/addproject" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/admindashboard/addproject"
                  className={`nav-link ${activeLink === "/admindashboard/addproject" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/admindashboard/addproject')}
                >
                  <i className="fs-9 bi bi-plus-circle ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Add Project</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 tw-rounded ${activeLink === "/admindashboard/tag" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/admindashboard/tag"
                  className={`nav-link ${activeLink === "/admindashboard/tag" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/admindashboard/tag')}
                >
                  <i className="fs-9 bi bi-tag ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Tag</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 tw-rounded ${activeLink === "/admindashboard/CreateMeeting" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/admindashboard/CreateMeeting"
                  className={`nav-link ${activeLink === "/admindashboard/CreateMeeting" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/admindashboard/CreateMeeting')}
                >
                  <i className="fs-9 bi bi-calendar-plus ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Create Meeting</span>
                </Link>
              </li>
              <li className="w-100 hover:tw-bg-gray-300 tw-rounded" onClick={handleLogout}>
                <Link
                  to="/adminlogin"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black"
                >
                  <i className="fs-9 bi bi-box-arrow-right ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default AdminDashboard;