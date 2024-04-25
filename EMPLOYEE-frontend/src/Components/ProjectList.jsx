import React, {useState} from 'react'

const ProjectList = () => {
    const [projects , setProjects] = useState([]);

  return (
    
    <div className="mt-3">
      <h2 className="text-center mb-3">Project List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tracked</th>
            <th>Progress</th>
            <th>Access</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.projectName}</td>
              <td>{project.timeElapsed}</td>
              <td>{project.progress}</td>
              <td>{project.access}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  )
}

export default ProjectList