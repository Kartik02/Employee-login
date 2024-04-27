import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Profile() {
  const [empData, setEmpData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/employee", { withCredentials: true })
      .then((response) => {
        setEmpData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxFileSize = 1 * 1024 * 1024; // 1 MB
    if (file) {
      if (file.size > maxFileSize) {
        alert("The file size exceeds the 1 MB limit. Please choose a smaller file.");
        return;
      }

      console.log("File selected:", file);
      setEmpData({
        ...empData,
        profileImage: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title tw-font-bold tw-text-2xl">Profile Settings</h1>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="profile-photo" className="form-label tw-font-semibold">
                      Profile Photo
                    </label>
                    <small className="text-muted d-block mb-2">
                      Formats: png, jpg, gif. Max size: 1 MB.
                    </small>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={empData?.profileImage || "https://via.placeholder.com/64"}
                        alt="Profile"
                        className="rounded-circle"
                        width="64"
                        height="64"
                      />
                      <button className="btn btn-primary ms-3" onClick={handleButtonClick}>
                        UPLOAD IMAGE
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="d-none" // This makes the input invisible
                        onChange={handleFileChange}
                        accept="image/*" // Ensure only images are selected
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="border-top pt-4">
                    <h2 className="card-title tw-font-semibold">Personal Info</h2>
                    <p className="text-muted mb-4">
                      Your log-in credentials and the name that is displayed in reports.
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
                            className="form-control"
                            id="name"
                            value={empData?.name || ""}
                            readOnly // Read-only if it's not meant to be editable
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
                              className="form-control"
                              id="email"
                              defaultValue={empData ? empData.email : ""}
                            />
                            <button className="btn btn-primary" type="button">
                              Change
                            </button>
                          </div>
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
                              className="form-control"
                              id="password"
                              defaultValue={empData ? empData.password : ""}
                            />
                            <button className="btn btn-primary" type="button">
                              Change
                            </button>
                          </div>
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
