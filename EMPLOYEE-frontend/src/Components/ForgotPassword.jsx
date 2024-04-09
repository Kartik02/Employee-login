import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a request to your backend to handle forgot password functionality
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
      });
      if (response.data.success) {
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setErrorMessage(
        "*An error occurred while processing your request, Please try again later with registered Email ID...!!!"
      );
    }
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="tw-h-screen tw-p-5 tw-flex tw-justify-center tw-items-center login">
      <div className="tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm tw-mx-auto tw-max-w-sm tw-w-full tw-sm:tw-w-[500px]">
        <div className="tw-flex tw-flex-col tw-p-6 tw-space-y-1">
          <div className="tw-flex tw-flex-col tw-items-center ">
            <h3 className="tw-whitespace-nowrap tw-tracking-tight tw-text-2xl tw-font-bold">
              Forgot Password
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="tw-p-6 tw-space-y-4">
            <div className="tw-space-y-2  ">
              <label htmlFor="email" className="tw-text-sm tw-font-medium">
                Please enter your email address reset your account.
              </label>
              <input
                type="email"
                id="email"
                className="tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background tw-placeholder-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" tw-text-red-700 tw-font-semibold ">
              {errorMessage}
            </div>
            <div className="tw-flex tw-justify-center tw-space-x-4  tw-py-4">
              <button className="tw-bg-black hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-2 tw-rounded">
                Reset Password
              </button>
              <button
                className="tw-bg-black hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-3 tw-rounded"
                onClick={handleLoginClick}
              >
                Back to Login
              </button>
            </div>
            <label htmlFor="email" className="tw-font-semibold">
              If you're facing any issues, please contact the service provider.
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
