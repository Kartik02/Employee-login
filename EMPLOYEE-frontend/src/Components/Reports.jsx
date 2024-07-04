import React, { useState, useEffect } from 'react';
import DonutChartComponent from '../Components/DonutChartComponent'; // Import your Donut Chart component
import BarGraphComponent from '../Components/BarGraphComponent'; // Import your Bar Graph component

const Reports = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetch('https://employee-management-2-srno.onrender.com/auth/projects')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch projects');
        }
      })
      .then(data => {
        setProjects(data);
      })
      
      .catch(error => {
        console.error('Error fetching projects:', error);
      }
      
      );
  }, []);
  
  // Generate a color palette dynamically
  const generateColorPalette = (numColors) => {
    // You can use any color generation library or algorithm here
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`); // Generate random hexadecimal color codes
    }
    return colors;
  };

  // Assign colors to projects
  const assignColorsToProjects = () => {
    const colorPalette = generateColorPalette(projects.length);
    return projects.map((project, index) => ({
      ...project,
      color: colorPalette[index],
    }));
  };

  // Use predefined colors (optional)
  const predefinedColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff']; // Example predefined colors

  // Assign predefined colors to projects (optional)
  const assignPredefinedColorsToProjects = () => {
    return projects.map((project, index) => ({
      ...project,
      color: predefinedColors[index % predefinedColors.length],
    }));
  };

  // Assign colors dynamically (default) or use predefined colors if preferred
  const projectsWithColors = assignColorsToProjects(); // Or assignPredefinedColorsToProjects();

  // Extract necessary data for pie chart and bar graph
  const donutChartData = projectsWithColors.map(project => ({ name: project.projectName, value: project.timeElapsed, color: project.color }));
  const barChartData = projectsWithColors.map(project => ({ name: project.projectName, timeElapsed: project.timeElapsed, color: project.color }));

  return (
    <>
      <div className='lg:tw-flex justify-between'> 
        <div className='tw-mx-2 tw-mt-1 lg:tw-w-1/2 md:tw-w-full tw-flex-shrink-0'> 
          <BarGraphComponent data={barChartData} />
        </div>
        <div className='tw-mx-2 tw-mt-1 lg:tw-w-1/2 md:tw-w-full tw-flex-shrink-0'>
          <DonutChartComponent data={donutChartData} />
        </div>
      </div>
    </>
  );
};

export default Reports;
