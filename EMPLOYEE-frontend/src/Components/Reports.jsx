import React, { useState, useEffect } from 'react';
import DonutChartComponent from './DonutChartComponent';
import BarGraphComponent from './BarGraphComponent';

const Reports = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://backendemp.vercel.app/auth/projects')
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
      });
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

  // Use predefined colors
  const predefinedColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff']; // Example predefined colors

  // Assign predefined colors to projects
  const assignPredefinedColorsToProjects = () => {
    return projects.map((project, index) => ({
      ...project,
      color: predefinedColors[index % predefinedColors.length],
    }));
  };

  // Assign colors to projects dynamically
  const projectsWithColors = assignColorsToProjects(); // Or assignPredefinedColorsToProjects();

  // Extract necessary data for pie chart and bar graph
  const donutChartData = projectsWithColors.map(project => ({ name: project.projectName, value: project.timeElapsed, color: project.color }));
  const barChartData = projectsWithColors.map(project => ({ name: project.projectName, timeElapsed: project.timeElapsed, color: project.color }));

  return (
    <>
      <div className='lg:tw-flex tw-w-full tw-gap-1'>


        <div className='lg:w-50 w-100'>
          <BarGraphComponent data={barChartData} />
        </div>
        <div className='lg:w-50 w-100'>
          <DonutChartComponent data={donutChartData} />
        </div>
      </div>
    </>
  );

};

export default Reports;
//done