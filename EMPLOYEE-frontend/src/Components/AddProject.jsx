import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { universalurl } from '../helper';

const AddProject = () => {
    const [project, setProject] = useState({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

      
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to add this project?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Send a POST request to the backend
                axios.post(`${universalurl}/auth/add_projects`, project)
                    .then((response) => {
                        if (response.status === 201) {
                            Swal.fire(
                                'Added!',
                                'Project has been added successfully.',
                                'success'
                            );
                            // Reset the form
                            setProject({ name: '' });
                        } else if (response.status === 400) {
                            Swal.fire(
                                'Error!',
                                'Project already exists.',
                                'error'
                            );
                        }
                    })
                    .catch((error) => {
                        console.error('Error adding project:', error);
                        // Handle error message or any other logic
                        Swal.fire(
                            'Error!',
                            'Project exists or something went wrong.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="tw-d-flex tw-justify-content-center tw-align-items-center tw-mt-3 ">
            <div className="p-3 rounded lg:tw-w-1/2 sm:tw-w-full tw-border tw-border-base-content">
                <form className="row g-1" onSubmit={handleSubmit}>
                    <label htmlFor="inputName" className="form-label">
                        Name <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control rounded-0 tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content"
                        placeholder="Enter Project Name"
                        onChange={(e) => setProject({ ...project, name: e.target.value })}
                        value={project.name}
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
