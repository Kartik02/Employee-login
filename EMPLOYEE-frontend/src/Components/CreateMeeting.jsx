// import React, { useState } from 'react';
// //Done
// const CreateMeeting = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     date: '',
//     time: '',
//     attendees: '',
//     description: '',
//   });

//   const [errors, setErrors] = useState({}); // State to track errors in fields

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '', // Clear the error when the user starts typing
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {};

//     // Check if any field is empty and set error message
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key]) {
//         newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
//       }
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors); // Set errors to display in the form
//       return; // Stop form submission
//     }

//     // If no errors, show success message and reload the page
//     if (window.confirm('New Meeting is created.')) {
//       window.location.reload(); // Reload the page when the user clicks OK
//     }
//   };

//   return (
//     <div className="container mt-5"> {/* Container with a top margin */}
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="text-center mb-4"> {/* Text centered with margin bottom */}
//             <h1 className="display-6 fw-bold">Create Meeting</h1>
//             <p className="text-muted">Fill out the form to schedule a new meeting.</p>
//           </div>
//           <form onSubmit={handleSubmit}>
//             {/* Meeting Title */}
//             <div className="mb-3">
//               <label className="form-label">
//                 Meeting Title <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 className={`form-control ${errors.title ? 'is-invalid' : ''}`}
//                 name="title"
//                 placeholder="Enter meeting title"
//                 value={formData.title}
//                 onChange={handleChange}
//               />
//               {errors.title && (
//                 <div className="invalid-feedback">{errors.title}</div>
//               )}
//             </div>
//             {/* Date and Time */}
//             <div className="row">
//               <div className="col">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Date <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     className={`form-control ${errors.date ? 'is-invalid' : ''}`}
//                     name="date"
//                     value={formData.date}
//                     onChange={handleChange}
//                   />
//                   {errors.date && (
//                     <div className="invalid-feedback">{errors.date}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Time <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="time"
//                     className={`form-control ${errors.time ? 'is-invalid' : ''}`}
//                     name="time"
//                     value={formData.time}
//                     onChange={handleChange}
//                   />
//                   {errors.time && (
//                     <div className="invalid-feedback">{errors.time}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {/* Attendees */}
//             <div className="mb-3">
//               <label className="form-label">
//                 Attendees <span className="text-danger">*</span>
//               </label>
//               <textarea
//                 className={`form-control ${errors.attendees ? 'is-invalid' : ''}`}
//                 name="attendees"
//                 rows={3}
//                 placeholder="Enter email addresses separated by commas"
//                 value={formData.attendees}
//                 onChange={handleChange}
//               />
//               {errors.attendees && (
//                     <div className="invalid-feedback">{errors.attendees}</div>
//               )}
//             </div>
//             {/* Description */}
//             <div className="mb-3">
//               <label className="form-label">
//                 Description <span className="text-danger">*</span>
//               </label>
//               <textarea
//                 className={`form-control ${errors.description ? 'is-invalid' : ''}`}
//                 name="description"
//                 rows={3}
//                 placeholder="Enter a description for the meeting"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//               {errors.description && (
//                     <div className="invalid-feedback">{errors.description}</div>
//               )}
//             </div>
//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//             >
//               Create Meeting
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateMeeting;


import React, { useState } from 'react';

const CreateMeeting = () => {
  const [formData, setFormData] = useState({
    title: '',
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

  const handleSubmit = (e) => {
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

    if (window.confirm('New Meeting is created.')) {
      window.location.reload();
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center mb-2">
            <h1 className="display-6 fw-bold">Create Meeting</h1>
            <p className="tw-text-gray-600">Fill out the form to schedule a new meeting.</p>
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
            <div className="row ">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control  tw-border-gray-600 tw-bg-base-300 tw-text-base-content ${errors.date ? 'is-invalid' : ''}`}
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  {errors.date && (
                    <div className="invalid-feedback">{errors.date}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    className={`form-control  tw-border-gray-600 tw-bg-base-300 tw-text-base-content ${errors.time ? 'is-invalid' : ''}`}
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                  {errors.time && (
                    <div className="invalid-feedback">{errors.time}</div>
                  )}
                </div>
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
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Create Meeting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;

