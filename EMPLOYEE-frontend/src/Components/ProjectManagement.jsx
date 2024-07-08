import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { universalurl } from "../helper";
const ProjectManagement = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectNamesResponse, projectTimeResponse] = await Promise.all([
        fetchProjectNames(),
        fetchProjectTime()
      ]);

      // Combine project names with corresponding time data
      const combinedData = projectNamesResponse.map((projectName, index) => ({
        projectName,
        totalTime: projectTimeResponse[index]?.totalTime || 0 // Default to 0 if no data
      }));

      setProjectData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProjectNames = async () => {
    try {
      const response = await fetch('https://employee-management-1-8mpl.onrender.com/auth/project_list');
      // const response = await fetch(`${universalurl}/auth/project_list`);
      const data = await response.json();
      return data; // Assuming the API returns an array of project names
    } catch (error) {
      console.error('Error fetching project names:', error);
      return [];
    }
  };

  const fetchProjectTime = async () => {
    try {
      const response = await axios.get('https://employee-management-1-8mpl.onrender.com/auth/project_time');
      // const response = await axios.get(`${universalurl}/auth/project_time`);
      const data = response.data;
      return data.map(project => ({
        projectName: project.projectName,
        totalTime: project.totalTime
      }));
    } catch (error) {
      console.error('Error fetching project times:', error);
      return [];
    }
  };

  const calculateTotalTime = (totalTime) => {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderProjects = () => {
    return projectData.map((project, index) => (
      <tr key={index}>
        <td className='tw-py-2 tw-px-4'>{project.projectName}</td>
        <td className='tw-py-2 tw-px-4'>{calculateTotalTime(project.totalTime)}</td>
        <td></td> {/* Add more columns as needed */}
        <td></td> {/* Add more columns as needed */}
      </tr>
    ));
  };

  return (
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
            <tr>
              <th className="tw-py-2 tw-px-4">Name</th>
              <th className="tw-py-2 tw-px-4">Time Taken</th>
              {/* Add more headers for additional columns */}
            </tr>
          </thead>
          <tbody>
            {renderProjects()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManagement;
