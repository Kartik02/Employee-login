import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { universalurl } from "../helper";

axios.defaults.withCredentials = true;

function Profile() {
  const [empData, setEmpData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [editedPassword, setEditedPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${universalurl}/auth/get_employee_data`, { withCredentials: true });
      if (response.data) {
        setEmpData({
          name: response.data.name,
          email: response.data.email,
          profileImage: response.data.profileImage,
        });
        setEditedPassword(response.data.password); // Set the initial password
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handlePasswordChange = () => {
    axios
      .post(`${universalurl}/auth/update_employee`, { password: editedPassword }, { withCredentials: true })
      .then(() => {
        setPasswordChanged(true);
      })
      .catch((error) => {
        console.error("Error updating password:", error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${universalurl}/auth/upload_profile`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Profile image uploaded successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error uploading profile image:", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 tw-border tw-border-base-content mt-5 tw-rounded">
          <div className="mb-3">
            <h1 className="tw-font-bold tw-text-2xl">Profile Settings</h1>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="profile-photo" className="form-label tw-font-semibold">Profile Photo</label>
                  <small className="d-block mb-2">Formats: png, jpg, gif. Max size: 1 MB.</small>
                  <div className="d-md-flex flex-md-column d-flex justify-content-around align-items-center mt-4">
                    <div className="rounded-circle overflow-hidden" style={{ width: "120px", height: "120px" }}>
                      <img
                        src={empData.profileImage ? `data:image/png;base64,${empData.profileImage}` : "https://via.placeholder.com/64"}
                        alt="Profile"
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <input
                      type="file"
                      id="profile-photo"
                      className="d-none"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <label
                      htmlFor="profile-photo"
                      className="mt-4 tw-bg-gradient-to-r tw-from-pink-500 tw-to-red-500 tw-text-white py-2 px-4 rounded tw-cursor-pointer"
                      style={{ fontSize: "12px", marginTop: "10px" }}
                    >
                      UPLOAD IMAGE
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="tw-border-t tw-border-base-content pt-4">
                  <h2 className="card-title tw-font-semibold">Personal Info</h2>
                  <p className="mb-4">Your log-in credentials and the name that is displayed in reports.</p>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="name" className="form-label tw-font-semibold">Name</label>
                        <input
                          type="text"
                          className="form-control tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
                          id="name"
                          value={empData.name || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-8">
                        <label htmlFor="email" className="form-label tw-font-semibold">Email</label>
                        <input
                          type="email"
                          className="form-control tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
                          value={empData.email || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="password" className="form-label tw-font-semibold">Password</label>
                        <div className="input-group">
                          <div className="tw-relative tw-flex-1">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={editedPassword}
                              onChange={(e) => setEditedPassword(e.target.value)}
                              className="form-control tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
                              style={{
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                              }}
                            />
                            <span
                              onClick={() => setShowPassword(!showPassword)}
                              className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-3 tw-cursor-pointer"
                            >
                              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                          </div>
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handlePasswordChange}
                          >
                            Change
                          </button>
                        </div>
                        {passwordChanged && (
                          <div className="text-success">
                            Password updated successfully!
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
