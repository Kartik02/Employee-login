import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tenlogo from "./../assets/tencompany.jpg";

const Login = () => {
  const [values, setValues] = useState({
    empid: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://rmbackend.vercel.app/auth/login", values)
      .then((result) => {
        console.log("Response data:", result.data);
        if (result.data.loginStatus) {
          console.log("Redirecting...");
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAdminClick = () => {
    navigate("/adminlogin"); // Redirect to the admin section
  };
  return (
    <div className="tw-h-screen tw-p-5 tw-flex tw-justify-center tw-items-center login">
      <div className="tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm tw-mx-auto tw-max-w-sm tw-w-full tw-sm:tw-w-[500px]">
        <div className="text-warning">{error && error}</div>
        <div className="tw-flex tw-flex-col tw-p-6 tw-space-y-1">
          <div className="tw-flex tw-flex-col tw-items-center tw-space-y-2">
            <img
              src={tenlogo}
              alt="Logo"
              width="100"
              height="100"
              className="rounded-lg"
            />
            <h3 className="tw-whitespace-nowrap tw-tracking-tight tw-text-2xl tw-font-bold">
              Employee Login
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="tw-p-6 tw-space-y-4">
            <div className="tw-space-y-2">
              <label
                className="tw-text-sm tw-font-medium tw-leading-none tw-peer-disabled:tw-cursor-not-allowed tw-peer-disabled:tw-opacity-70"
                htmlFor="employeeid"
              >
                Employee ID
              </label>
              <input
                className="tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                id="employeeid"
                placeholder="Employee ID"
                required=""
                onChange={(e) =>
                  setValues({ ...values, empid: e.target.value })
                }
                class="form-control rounded 0"
              />
            </div>
            <div className="tw-space-y-2">
              <label
                className="tw-text-sm tw-font-medium tw-leading-none tw-peer-disabled:tw-cursor-not-allowed tw-peer-disabled:tw-opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                id="password"
                placeholder="Password"
                required=""
                type="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                class="form-control rounded 0"
              />
            </div>

            <div>
              <a className="tw-underline" href="/forgotpassword">
                Forgot Password?
              </a>
            </div>
            <div className="tw-text-center">
              <button className="tw-bg-black hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Login
              </button>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button
                className="tw-bg-black hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded"
                onClick={handleAdminClick}
              >
                Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
