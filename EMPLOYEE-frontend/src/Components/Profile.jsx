import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

function Profile() {
  const [empData, setEmpData] = useState({
    name: '',
    email: '',
    profileImage: ''
  });
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/get_employee_data', { withCredentials: true });
      if (response.data) {
        setEmpData({
          name: response.data.name,
          email: response.data.email,
          profileImage: response.data.profileImage
        });
        setEditedEmail(response.data.email); // Set the initial email
        setEditedPassword(response.data.password); // Set the initial password
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleEmailChange = () => {
    axios
      .post(
        "http://localhost:5000/auth/update_employee",
        { email: editedEmail },
        { withCredentials: true }
      )
      .then(() => {
        setEmpData({ ...empData, email: editedEmail });
        setEmailChanged(true);
      })
      .catch((error) => {
        console.error("Error updating email:", error);
      });
  };

  const handlePasswordChange = () => {
    axios
      .post(
        "http://localhost:5000/auth/update_employee",
        { password: editedPassword },
        { withCredentials: true }
      )
      .then(() => {
        console.log("Password updated successfully");
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
      .post("http://localhost:5000/auth/upload_profile", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Display success message
        alert("Profile image uploaded successfully");
        window.location.reload();
      })
      .then((response) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setEmpData({ ...empData, profileImage: e.target.result });
        };
        reader.readAsDataURL(file);
      })
      .catch((error) => {
        console.error("Error uploading profile image:", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 tw-border tw-border-base-content mt-5 tw-rounded">
          <div className="">
            <div className="mb-5">
              <h1 className=" tw-font-bold tw-text-2xl">Profile Settings</h1>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label
                      htmlFor="profile-photo"
                      className="form-label tw-font-semibold"
                    >
                      Profile Photo
                    </label>
                    <small className=" d-block mb-2">
                      Formats: png, jpg, gif. Max size: 1 MB.
                    </small>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={
                          empData.profileImage
                            ? `data:image/png;base64,${empData.profileImage}`
                            : "https://via.placeholder.com/64"
                        }
                        alt="Profile"
                        className="rounded-circle"
                        width="64"
                        height="64"
                      />
                      <input
                        type="file"
                        id="profile-photo"
                        className="d-none"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                      <label
                        htmlFor="profile-photo"
                        className="btn btn-primary mt-2"
                        style={{ fontSize: "12px", marginLeft: "12px" }}
                      >
                        UPLOAD IMAGE
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="tw-border-t tw-border-base-content pt-4">
                    <h2 className="card-title tw-font-semibold">
                      Personal Info
                    </h2>
                    <p className=" mb-4">
                      Your log-in credentials and the name that is displayed in
                      reports.
                    </p>
                    <form>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label
                            htmlFor="name"
                            className="form-label tw-font-semibold"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
                            id="name"
                            value={empData.name || ""}
                            readOnly
                          />
                        </div>
                        <div className="col-md-8">
                          <label
                            htmlFor="email"
                            className="form-label tw-font-semibold"
                          >
                            Email
                          </label>
                          <div className="input-group">
                            <input
                              type="email"
                              className="form-control tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
                              value={editedEmail}
                              onChange={(e) => setEditedEmail(e.target.value)}
                            />
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={handleEmailChange}
                            >
                              Change
                            </button>
                          </div>
                          {emailChanged && (
                            <div className="text-success">
                              Email updated successfully!
                            </div>
                          )}
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="password"
                            className="form-label tw-font-semibold"
                          >
                            Password
                          </label>
                          <div className="input-group">
                            <input
                              type="password"
                              className="form-control tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
                              value={editedPassword}
                              onChange={(e) =>
                                setEditedPassword(e.target.value)
                              }
                            />
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
    </div>
  );
}

export default Profile;
