import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('https://rmbackend.vercel.app/auth/logout')
      .then(result => {
        if (result.data.Status) {
          navigate('adminlogin');
        }
      });
  };

  useEffect(() => {
    // Example data fetching, replace with your actual data fetching logic
    axios.get('https://rmbackend.vercel.app/some-endpoint')
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid hover tw-bg-base-300 tw-text-base-content tw-h-screen ">
      <div className="row flex-nowrap  p-0">
        <div className="col-auto col-2 col-md-3 col-xl-2 px-xxl-2 px-0  hover:bg-gray-900 tw-h-screen">
          <div className="d-flex bg-dark col-2 col-md-3 col-xl-2 px-sm-2 px-0 flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 tw-fixed tw-h-screen">
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
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle hover:text-primary tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/timesheet"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi bi-calendar3 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"> Timesheet</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/timetracker"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi bi-clock ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"> TimeTracker</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/calender"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi bi-calendar ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Calendar</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/reports"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi bi-bar-chart-fill ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Report</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/projectmanagement"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi bi-file-earmark ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Project</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employeesec"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi bi-journal-text ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"> Employee sec</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/leave"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi bi-house-heart ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leave</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link
                  to="/"
                  className="nav-link text-white px-0 align-middle tw-text-xs md:tw-text-xl"
                >
                  <i className="fs-9 bi-power ms-2"></i>
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
