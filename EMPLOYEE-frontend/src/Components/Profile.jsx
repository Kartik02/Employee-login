import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
    const [empData, setEmpData] = useState(null);

    useEffect(() => {
        // Fetch employee data from the backend
        axios.get("http://localhost:5000/auth/employee", { withCredentials: true })
            .then((response) => {
                setEmpData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employee data:", error);
            });
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h1 className="card-title tw-font-bold tw-text-2xl ">Profile settings</h1>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="profile-photo" className="form-label tw-font-semibold">
                                            Profile photo
                                        </label>
                                        <small className="text-muted d-block mb-2">
                                            Formats: png, jpg, gif. Max size: 1 MB.
                                        </small>
                                        <div className="d-flex align-items-center mb-3">
                                            <img
                                                src="data:image/jpeg;base64,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"
                                                alt="Profile"
                                                className="rounded-circle"
                                                width="64"
                                                height="64"
                                            />
                                            <button className="btn btn-primary ms-3">
                                                UPLOAD IMAGE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="border-top pt-4">
                                        <h2 className="card-title tw-font-semibold">Personal info</h2>
                                        <p className="text-muted mb-4">
                                            Your log-in credentials and the name that is displayed in
                                            reports.
                                        </p>
                                        <form action="#" method="post">
                                            <div className="row g-3">
                                                <div className="col-md-4">
                                                    <label htmlFor="name" className="form-label tw-font-semibold">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        defaultValue={empData ? empData.name : ""}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <label htmlFor="email" className="form-label tw-font-semibold">
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
                                                    <label htmlFor="password" className="form-label tw-font-semibold">
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
