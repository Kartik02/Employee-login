import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://rmbackend.vercel.app/auth/forgotpassword", {
        email,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error occurred:", error);
      setErrorMessage("An error occurred while processing your request. Please try again later.");
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://rmbackend.vercel.app/auth/resetpassword", {
        email,
        otp,
        password: newPassword,
      });
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error occurred:", error);
      setErrorMessage("An error occurred while processing your request. Please try again later.");
    }
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
        <form onSubmit={handleOtpSubmit}>
          <div className="tw-p-6 tw-space-y-4">
            <div className="tw-space-y-2  ">
              <label htmlFor="email" className="tw-text-sm tw-font-medium">
                Please enter your email address to reset your account.
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
            <div className="tw-text-red-700 tw-font-semibold">{errorMessage}</div>
            <div className="tw-flex tw-justify-center tw-space-x-4  tw-py-4">
              <button className="tw-bg-black hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-2 tw-rounded">
                Send OTP
              </button>
            </div>
          </div>
        </form>
        <form onSubmit={handleResetPassword}>
          <div className="tw-p-6 tw-space-y-4">
            <div className="tw-space-y-2  ">
              <label htmlFor="otp" className="tw-text-sm tw-font-medium">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background tw-placeholder-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="tw-space-y-2  ">
              <label htmlFor="newPassword" className="tw-text-sm tw-font-medium">
                Enter New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background tw-placeholder-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="tw-text-red-700 tw-font-semibold">{errorMessage}</div>
            <div className="tw-flex tw-justify-center tw-space-x-4  tw-py-4">
              <button className="tw-bg-black hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-2 tw-rounded">
                Reset Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;