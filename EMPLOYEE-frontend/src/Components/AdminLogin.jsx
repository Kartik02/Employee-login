import React, { useState } from "react";
import "./AdminStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://rmbackend.vercel.app/auth/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          navigate("/admindashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-65 border loginForm">
        <div className="text-warning">{error && error}</div>
        <h2 className=" tw-text-[40px] tw-font-semibold">Login page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="enter mail"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded 0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="enter password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded 0"
            />
          </div>
          <button className="btn btn-success w-100 rounded 0">log in</button>
          {/* <div className="mb-3">
                <input type="checkbox" name="tick" id="tick"
                <label htmlFor="password"><strong>Term & Condition</strong></label>
                
               
            </div> */}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
