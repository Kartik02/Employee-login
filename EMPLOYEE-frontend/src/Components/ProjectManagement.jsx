import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await fetch('https://rmbackend.vercel.app/auth/projects');
    const data = await response.json();
    setProjects(data);
  };

  const calculateTotalTime = (projectName) => {
    let totalTimeInSeconds = 0;
    projects.forEach((project) => {
      if (project.projectName === projectName) {
        totalTimeInSeconds += project.timeElapsed;
      }
    });

    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const renderProjects = () => {
    const uniqueProjects = Array.from(new Set(projects.map((project) => project.projectName)));
    return uniqueProjects.map((projectName) => (
      <tr key={projectName}>
        <td>{projectName}</td>
        <td>{calculateTotalTime(projectName)}</td>
        <td></td>
        <td></td>
      </tr>
    ));
  };

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className="tw-flex tw-items-center tw-justify-between tw-p-4">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search..."
              className="tw-flex-grow tw-px-4 tw-py-2 tw-ml-4 tw-border tw-border-base-content tw-rounded tw-shadow-md tw-focus:outline-none tw-focus:ring tw-focus:ring-blue-500"
            />
          </div>
          <table className="tw-w-full tw-border-collapse tw-border tw-border-base-content">
            <thead>
              <tr className="">
                <th className="tw-py-2 tw-px-4">Name</th>
                <th className="tw-py-2 tw-px-4">Tracked</th>
                <th className="tw-py-2 tw-px-4">Progress</th>
                <th className="tw-py-2 tw-px-4">Access</th>
              </tr>
            </thead>
            <tbody>
              {renderProjects()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProjectManagement;

