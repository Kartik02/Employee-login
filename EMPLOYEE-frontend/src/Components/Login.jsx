import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tenlogo from "./../assets/tencompany.jpg";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { universalurl } from "../helper";

axios.defaults.withCredentials = true;
const Login = () => {
  const [values, setValues] = useState({
    empid: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${universalurl}/auth/login`, values)
      .then((result) => {
        console.log("Response data:", result.data);
        if (result.data.loginStatus) {
          Swal.fire({
            title: "Login Successfully!",
            text: "Welcome back! You have successfully logged in.",
            icon: "success"
        });
          console.log("Redirecting...");
          navigate("/dashboard");
        
        } else {
          setError(result.data.Error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      })
      .catch((err) => {console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again later.",
        });
      });
  };

  const handleAdminClick = () => {
    navigate("/adminlogin"); // Redirect to the admin section
  };
  return (
    <div className="tw-h-screen tw-flex">
    <div
      className="tw-hidden md:tw-block md:tw-w-1/2 tw-bg-cover tw-bg-center"
      style={{
        backgroundImage: 'url(https://assets.weforum.org/article/image/yvewLY0GS9SWCu9vCUQxCK16PJsKX4ww-rxLLC-ch70.jpg)',
      }}
    >
      <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-bg-black/50 tw-p-4">
        <h2 className="tw-text-white tw-text-4xl tw-font-bold">Welcome Back</h2>
        <p className="tw-text-white tw-text-lg tw-mt-4 tw-text-center">
          We're excited to see you again! Log in to access your dashboard and continue making a difference. Your dedication and hard work are what drive our success.
        </p>
      </div>
    </div>
    <div className="tw-w-full md:tw-w-1/2 tw-bg-slate-800 tw-flex tw-justify-center tw-items-center">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-8 tw-w-full tw-max-w-md">
        
        <div className="tw-flex tw-flex-col tw-items-center tw-mb-6">
          <img src={tenlogo} alt="Logo" width="100" height="100" className="tw-rounded-lg" />
          <h3 className="tw-text-2xl tw-font-bold">Employee Login</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="employeeid" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Employee ID</label>
            <input
              id="employeeid"
              type="text"
              placeholder="Employee ID"
              required
              onChange={(e) => setValues({ ...values, empid: e.target.value })}
              className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-bg-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="password" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Password</label>
            <div className="tw-relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-bg-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-3 tw-cursor-pointer"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

          </div>
          <div className="tw-mb-4">
            <a className="tw-text-sm tw-text-indigo-600 hover:tw-underline" href="/forgotpassword">Forgot Password?</a>
          </div>
          <div className="tw-flex tw-justify-center tw-space-x-4">
            <button type="submit" className="tw-bg-black hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">Login</button>
            <button type="button" className="tw-bg-black hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded" onClick={handleAdminClick}>Admin</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default Login;