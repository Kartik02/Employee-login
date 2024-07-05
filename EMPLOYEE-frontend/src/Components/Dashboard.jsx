import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactLoading from 'react-loading';
import { universalurl } from "../helper";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState(location.pathname);

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get(`${universalurl}/auth/logout`)
      .then(result => {
        if (result.data.Status) {
          navigate('adminlogin');
        }
      });
  };

  useEffect(() => {
    // Example data fetching, replace with your actual data fetching logic
    axios.get(`${universalurl}/some-endpoint`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  // Defensive check before calling reduce
  const processedData = data && Array.isArray(data) ? data.reduce((acc, item) => {
    // Your reduce logic here
    return acc;
  }, []) : [];

  if (loading) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-black">
        <ReactLoading type={"bubbles"} color={"#fff"} height={'10%'} width={'10%'} />
      </div>
    );
  }

  const handleNavClick = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  return (
    <div className="container-fluid tw-bg-base-300 tw-text-base-content tw-h-screen sm:tw-h-full">
      <div className="row flex-nowrap p-0 ">
        <div className="col-auto col-2 col-md-3 col-xl-2 px-xxl-2 px-0 tw-h-screen overflow-y-auto sm:h-full">
          <div className="d-flex bg-dark col-2 col-md-3 col-xl-2 px-sm-2 px-0 flex-column  px-3 pt-2 text-white min-vh-100 tw-fixed sm:tw-h-full">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none tw-text-xs md:tw-text-xl"
            >
              <span className="fs-9 fw-bolder d-none d-sm-inline">
                Employee MS
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className={`w-100 hover:tw-bg-gray-300 mb-1 tw-rounded ${activeLink === "/dashboard" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/dashboard"
                  className={`nav-link ${activeLink === "/dashboard" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/dashboard')}
                >
                  <i className="fs-9 bi-speedometer2 ms-3"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 mb-1 tw-rounded ${activeLink === "/dashboard/timesheet" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/dashboard/timesheet"
                  className={`nav-link ${activeLink === "/dashboard/timesheet" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/dashboard/timesheet')}
                >
                  <i className="fs-9 bi bi-calendar3 ms-3"></i>
                  <span className="ms-2 d-none d-sm-inline"> Timesheet</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 mb-1 tw-rounded ${activeLink === "/dashboard/timetracker" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/dashboard/timetracker"
                  className={`nav-link ${activeLink === "/dashboard/timetracker" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/dashboard/timetracker')}
                >
                  <i className="fs-9 bi bi-clock ms-3"></i>
                  <span className="ms-2 d-none d-sm-inline"> TimeTracker</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 mb-1 tw-rounded ${activeLink === "/dashboard/calender" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/dashboard/calender"
                  className={`nav-link ${activeLink === "/dashboard/calender" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/dashboard/calender')}
                >
                  <i className="fs-9 bi bi-calendar ms-3"></i>
                  <span className="ms-2 d-none d-sm-inline">Calendar</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 mb-1 tw-rounded ${activeLink === "/dashboard/reports" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/dashboard/reports"
                  className={`nav-link ${activeLink === "/dashboard/reports" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/dashboard/reports')}
                >
                  <i className="fs-9 bi bi-bar-chart-fill ms-3"></i>
                  <span className="ms-2 d-none d-sm-inline">Report</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 mb-1 tw-rounded ${activeLink === "/dashboard/profile" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/dashboard/profile"
                  className={`nav-link ${activeLink === "/dashboard/profile" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/dashboard/profile')}
                >
                  <i className="fs-9 bi-person ms-3"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className={`w-100 hover:tw-bg-gray-300 mb-1 tw-rounded ${activeLink === "/dashboard/leave" ? "tw-bg-gray-300" : ""}`}>
                <Link
                  to="/dashboard/leave"
                  className={`nav-link ${activeLink === "/dashboard/leave" ? "tw-text-black" : "text-white"} px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black`}
                  onClick={() => handleNavClick('/dashboard/leave')}
                >
                  <i className="fs-9 bi bi-house-heart ms-3"></i>
                  <span className="ms-2 d-none d-sm-inline">Leave</span>
                </Link>
              </li>
              <li className="w-100 hover:tw-bg-gray-300 mb-1 tw-rounded" onClick={handleLogout}>
                <Link
                  to="/"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl flex items-center justify-center hover:tw-text-black"
                >
                  <i className="fs-9 bi-power ms-3"></i>
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

export default Dashboard;
