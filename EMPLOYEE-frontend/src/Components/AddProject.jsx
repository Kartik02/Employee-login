import React, {useState} from 'react'

const AddProject = () => {
    const [project, setProject] = useState({
        name: '',
    });

    const handleSubmit = (e) => {

    }
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
  )
}

export default AddProject