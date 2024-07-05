import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { universalurl } from "../helper";

const AdminLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${universalurl}/auth/adminlogin`, values)
      .then((result) => {
        if (result.data.loginStatus) {
          Swal.fire({
            title: "Login Successfully!",
            text: "Welcome back! You have successfully logged in.",
            icon: "success",
          });
          navigate("/admindashboard");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
          // setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again later.",
        });
      });
  };

  return (
    <div
      className="tw-h-screen tw-text-black tw-backdrop-blur-3xl tw-bg-white/30 tw-p-5 tw-flex tw-justify-center tw-items-center loginPage"
      style={{
        backgroundImage: 'url(https://cdn.wallpapersafari.com/89/75/XcwfTN.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm tw-mx-auto tw-max-w-sm tw-w-full tw-sm:tw-w-[500px] loginForm">
        <div className="tw-flex tw-flex-col tw-p-6 tw-space-y-1">
          <h2 className="tw-text-center tw-mb-4 tw-whitespace-nowrap tw-tracking-tight tw-text-[20px] tw-font-bold">Admin Login</h2>
          <hr />
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your email"
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                className="form-control rounded 0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password:</strong>
              </label>
              <div className="tw-relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  className="form-control rounded 0"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-3 tw-cursor-pointer"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            <button className="btn btn-success w-100 rounded 0">Log In</button>
            {/* <div className="mb-3">
              <input type="checkbox" name="tick" id="tick" />
              <label htmlFor="password"><strong>Term & Condition</strong></label>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
