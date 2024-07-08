import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateMeeting = () => {
  const [formData, setFormData] = useState({
    title: '',
    meeting_code: '',
    date: '',
    time: '',
    attendees: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('https://employee-management-1-8mpl.onrender.com/auth/add_meeting', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setFormData({
            title: '',
            meeting_code: '',
            date: '',
            time: '',
            attendees: '',
            description: '',
          });
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while creating the meeting.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center mb-2">
            <h1 className="display-6 fw-bold">Create Meeting</h1>
            <p className="">Fill out the form to schedule a new meeting.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Meeting Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control tw-placeholder-gray-600 tw-border-gray-600 tw-bg-base-300 tw-text-base-content ${errors.title ? 'is-invalid' : ''}`}
                name="title"
                placeholder="Enter meeting title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">
                Meeting Code <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control tw-placeholder-gray-600 tw-border-gray-600 tw-bg-base-300 tw-text-base-content ${errors.meeting_code ? 'is-invalid' : ''}`}
                name="meeting_code"
                placeholder="Enter meeting code"
                value={formData.meeting_code}
                onChange={handleChange}
              />
              {errors.meeting_code && (
                <div className="invalid-feedback">{errors.meeting_code}</div>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control tw-placeholder-gray-600 tw-border-gray-600 tw-bg-base-300 tw-text-base-content ${errors.date ? 'is-invalid' : ''}`}
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <div className="invalid-feedback">{errors.date}</div>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Time <span className="text-danger">*</span>
                </label>
                <input
                  type="time"
                  className={`form-control tw-placeholder-gray-600 tw-border-gray-600 tw-bg-base-300 tw-text-base-content ${errors.time ? 'is-invalid' : ''}`}
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
                {errors.time && (
                  <div className="invalid-feedback">{errors.time}</div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Attendees <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control tw-placeholder-gray-600 tw-border-gray-600 tw-bg-base-300 tw-text-base-content ${errors.attendees ? 'is-invalid' : ''}`}
                name="attendees"
                rows={3}
                placeholder="Enter email addresses separated by commas"
                value={formData.attendees}
                onChange={handleChange}
              />
              {errors.attendees && (
                <div className="invalid-feedback">{errors.attendees}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control tw-placeholder-gray-600 tw-border-gray-600 tw-bg-base-300 tw-text-base-content ${errors.description ? 'is-invalid' : ''}`}
                name="description"
                rows={3}
                placeholder="Enter a description for the meeting"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Create Meeting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
