import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { universalurl } from '../helper';

const Timesheet = () => {
  const [rows, setRows] = useState([]);
  const [weekDates, setWeekDates] = useState([]);
  const [projects, setProjects] = useState([]);

  const addRow = () => {
    const newRow = { id: rows.length + 1, projectName: '', data: Array(weekDates.length).fill('') };
    setRows([...rows, newRow]);
  };

  const generateWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);
      const day = currentDate.toLocaleString('en', { weekday: 'short' });
      const date = currentDate.getDate();
      dates.push({ day, date });
    }
    setWeekDates(dates);
  };


  useEffect(() => {
    fetchProjects();
    generateWeekDates();
  }, []);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${universalurl}/auth/project_list`);
      setProjects(response.data);
    }
    
    catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  
  const handleChange = (rowIndex, columnName, value) => {
    const updatedRows = [...rows];
    if (columnName === 'projectName') {
      updatedRows[rowIndex].projectName = value;
    } else {
      const columnIndex = weekDates.findIndex((date) => date.day === columnName);
      updatedRows[rowIndex].data[columnIndex] = value;
    }
    setRows(updatedRows);
  };

  const calculateRowTotal = (rowData) => {
    return rowData.reduce((acc, val) => acc + parseFloat(val), 0);
  };

  const calculateTotalSum = () => {
    return rows.reduce((acc, row) => acc + calculateRowTotal(row.data), 0);
  };

  return (
    <div>
      <h2>Timesheet</h2>
      <div className="tw-d-flex tw-justify-content-center tw-mt-20 p-4">
        <h3>
          <span className="tw-border tw-border-3">this week</span>
        </h3>
      </div>
      <div className="tw-container tw-mx-auto p-4 tw-overflow-x-auto">
        <table className=" tw-border-collapse tw-min-w-full tw-border tw-border-gray-400">
          <thead>
            <tr>
              <th className="tw-border tw-border-gray-400 tw-px-4 tw-py-2" >Project Name</th>
              {weekDates.map((date, index) => (
                <th key={index} className="tw-border tw-border-gray-400 tw-px-4 tw-py-2">
                  {`${date.day}, ${date.date}`}
                </th>
              ))}
              <th className="tw-border tw-border-gray-400 tw-px-4 tw-py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id}>
                <td className="tw-border tw-border-gray-400 tw-px-4 tw-py-2">
                  {/* Dropdown for project name */}
                  <select
                    value={row.projectName}
                    onChange={(e) => handleChange(rowIndex, 'projectName', e.target.value)}
                    className="tw-w-full tw-outline-none"

                  >
                    <option value="">Select Project</option>
                    {projects.map((project, index) => (
                      <option key={index} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                </td>
                {row.data.map((cell, cellIndex) => (
                  <td key={cellIndex} className="tw-border tw-border-gray-400 tw-px-4 tw-py-2">
                    <input
                      type="text"
                      className="tw-w-full tw-outline-none"
                      value={cell}
                      onChange={(e) => handleChange(rowIndex, weekDates[cellIndex].day, e.target.value)}

                    />
                  </td>
                ))}
                <td className="tw-border tw-border-gray-400 tw-px-4 tw-py-2">
                  {calculateRowTotal(row.data).toFixed(2)} {/* Display row total */}
                </td>
              </tr>
            ))}
            <tr>
              <td className="tw-border tw-border-gray-400 tw-px-4 tw-py-2">Total</td>
              {/* Empty cells for week dates */}
              {weekDates.map((date, index) => (
                <td key={index} className="tw-border tw-border-gray-400 tw-px-4 tw-py-2"></td>
              ))}
              <td className="tw-border tw-border-gray-400 tw-px-4 tw-py-2">
                {calculateTotalSum().toFixed(2)} {/* Display total sum */}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tw-mt-4">
          <button
            onClick={addRow}
            className="tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded"
          >
            Add Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timesheet;
