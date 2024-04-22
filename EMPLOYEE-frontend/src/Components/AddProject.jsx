import React, { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
    const [project, setProject] = useState({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send a POST request to the backend
        axios.post('http://localhost:5000/api/add_projects', project)
            .then((response) => {
                if (response.status === 201) {
                    console.log(response.data.message);
                    // Display success message
                    alert('Project added successfully');
                    // Reset the form
                    setProject({ name: '' });
                } else if (response.status === 400) {
                    console.log(response.data.error);
                    // Display error message
                    alert('Project already exists');
                }
            })
            .catch((error) => {
                console.error('Error adding project:', error);
                // Handle error message or any other logic
                alert('Project exist or something went wrong');
            });
    };

    return (
        <div className="tw-d-flex tw-justify-content-center tw-align-items-center tw-mt-3 ">
            <div className="p-3 rounded w-50 border ">
                <form className="row g-1" onSubmit={handleSubmit}>
                    <label htmlFor="inputName" className="form-label">
                        Name <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control rounded-0"
                        placeholder="Enter Project Name"
                        onChange={(e) => setProject({ ...project, name: e.target.value })}
                        required
                    />
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-success w-100">
                            Add Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
