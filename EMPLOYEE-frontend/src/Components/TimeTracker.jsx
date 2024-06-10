import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

const Stopwatch = () => {
  const [task, setTask] = useState("");
  const [projectName, setProjectName] = useState("");
  const [tags, setTags] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [date, setDate] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [projects, setProjects] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const intervalRef = useRef();

  useEffect(() => {
    fetchProjects();
    fetchTags();
    fetchEmployeeProjects(); // Fetch employee projects when component mounts
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://rmbackend.vercel.app/auth/project_list');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get('https://rmbackend.vercel.app/auth/tag_list');
      setTags(response.data.tags.map(tag => ({ name: tag.tag, checked: false })));
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchEmployeeProjects = async () => {
    try {
      const response = await axios.get('https://rmbackend.vercel.app/auth/get_employee_projects', { withCredentials: true });
      const employeeProjects = response.data.projects;
      // Assuming the employeeProjects data format is similar to the submittedDetails state
      setSubmittedDetails(employeeProjects);
    } catch (error) {
      console.error('Error fetching employee projects:', error);
    }
  };

  const startTimer = () => {
    const startTime = Date.now() - (pausedTime ? pausedTime : 0);
    intervalRef.current = setInterval(() => {
      setTimeElapsed(Date.now() - startTime);
    }, 1000);
  };

  const handleStart = () => {
    if (!projectName.trim()) {
      alert("Project name is required!");
      return;
    }
    setIsRunning(true);
    startTimer();
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setPausedTime(timeElapsed);
  };

  const handleResume = () => {
    setIsRunning(true);
    startTimer();
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTimeElapsed(0);
    setPausedTime(0);
    setIsRunning(false);
    setTask("");
    setProjectName("");
    setTags(tags.map(tag => ({ ...tag, checked: false })));
  };

  const handleRun = (index) => {
    if (isRunning) return; // Prevent running if already running
    setEditIndex(index);
    const startTime = Date.now() - timeToMilliseconds(submittedDetails[index].timeTaken);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newDetails = [...submittedDetails];
      newDetails[index].timeTaken = formatTime(elapsedTime);
      setSubmittedDetails(newDetails);
    }, 1000);
  };

  const handleStop = () => {
    if (!isRunning) return; // Prevent stopping if already stopped
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleTagClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleTagSelect = (tagName) => {
    const updatedTags = tags.map(tag =>
      tag.name === tagName ? { ...tag, checked: !tag.checked } : tag
    );
    setTags(updatedTags);
  };

  const handleSubmit = async () => {
    if (!task.trim()) {
        alert("Task description is required!");
        return;
    }
    if (!projectName.trim()) {
        alert("Project name is required!");
        return;
    }
    const selectedTags = tags.filter(tag => tag.checked).map(tag => tag.name);

    const newDetails = {
        projectName,
        task,
        tags: selectedTags,
        timeTaken: formatTime(timeElapsed),
    };

    console.log('Sending data:', { task, projectName, tags: selectedTags, timeElapsed });

    try {
        const response = await axios.post('https://rmbackend.vercel.app/auth/add_project_data', {
            task,
            projectName,
            tags: selectedTags,
            timeElapsed
        });
        setSubmittedDetails([...submittedDetails, { ...newDetails, projectid: response.data.projectid }]);
        handleReset();
    } catch (error) {
        console.error('Error adding project:', error);
    }
  };

  const handleUpdateSubmit = async (index) => {
    const detail = submittedDetails[index];
    const projectId = detail.projectid; // Retrieve projectid from project detail object
    try {
      await axios.post(`https://rmbackend.vercel.app/auth/update_project_data/${projectId}`, {
        projectid: projectId,
        task: detail.task,
        projectName: detail.projectName,
        tags: detail.tags,
        timeElapsed: timeToMilliseconds(detail.timeTaken)
      });
      setEditIndex(null);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const timeToMilliseconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  };


  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-center tw-p-4">
        <div className="tw-mb-4 tw-border-2 tw-border-base-content tw-rounded tw-p-2 md:tw-flex tw-w-full">
          <input
            type="text"
            placeholder="What are you working on?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="tw-border tw-w-full tw-border-gray-500 tw-px-2 tw-py-1 tw-mr-2 tw-flex-1 "
            style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, }}
          />
          <div className="tw-relative tw-flex-1">
            <select
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="tw-border tw-border-gray-500 tw-px-2 tw-py-1 tw-mr-2 tw-flex-1"

            >
              <option value="">Select Project</option>
              {projects.map((project, index) => (
                <option key={index} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>
          <div className="absolute tw-right">
            <div
              className="tw-border tw-border-gray-500 tw-px-2 tw-py-1 tw-cursor-pointer"
              onClick={handleTagClick}
              style={{ marginRight: '8px' }}
            >
              {tags.filter(tag => tag.checked).length > 0 ? tags.filter(tag => tag.checked).map(tag => tag.name).join(", ") : <i className="bi bi-tag"></i>}
            </div>
            {showDropdown && (
              <div className="tw-absolute tw-mt-1 tw-bg-white tw-shadow-md tw-rounded-md" style={{ color: 'black' }}>
                <ul>
                  {tags.map((tag, index) => (
                    <li key={index} className="tw-cursor-pointer tw-px-3 tw-py-2 tw-hover:bg-gray-200">
                      <input
                        type="checkbox"
                        checked={tag.checked}
                        onChange={() => handleTagSelect(tag.name)}

                      />
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!projectName.trim()}
              className={`tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded ${!projectName.trim() && "tw-opacity-50 tw-cursor-not-allowed"}`}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Start
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="tw-bg-red-500 tw-hover:bg-red-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded tw-mr-2"
              >
                Pause
              </button>
              <button
                onClick={handleReset}
                className="tw-bg-gray-500 tw-hover:bg-gray-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded"
              >
                Reset
              </button>
            </>
          )}
        </div>
        <div>
          <h2 className="tw-font-bold">Time Taken: {formatTime(timeElapsed)}</h2>
        </div>
        {isRunning && (
          <button
            onClick={handleSubmit}
            className="tw-bg-green-500 tw-hover:bg-green-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded"
          >
            Submit
          </button>
        )}
        {!isRunning && pausedTime > 0 && (
          <button
            onClick={handleResume}
            className="tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded"
          >
            Resume
          </button>
        )}
      </div>

      <div className="tw-p-4 tw-overflow-x-auto">
        <table className="tw-mt-4 tw-border tw-border-base-content tw-w-full  ">
          <thead>
            <tr>
              <th className="tw-border tw-p-2 tw-w-1/5">Project Name</th>
              <th className="tw-border tw-p-2 tw-w-1/5">Description</th>
              <th className="tw-border tw-p-2 tw-w-1/5">Tag</th>
              <th className="tw-border tw-p-2 tw-w-1/5">Time Taken</th>
              <th className="tw-border tw-p-2 tw-w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedDetails.map((detail, index) => (
              <tr key={index}>
                <td className="tw-border tw-p-2 tw-w-1/5">{detail.projectName}</td>
                <td className="tw-border tw-p-2 tw-w-1/5">{detail.task}</td>
                <td className="tw-border tw-p-2 tw-w-1/5">{detail.tags.join(", ")}</td>
                <td className="tw-border tw-p-2 tw-w-1/5">{detail.timeTaken}</td>
                <td className="tw-border tw-p-2 tw-w-1/5">
                  {editIndex !== index ? (
                    <button
                      onClick={() => handleRun(index)}
                      className="tw-bg-green-500 tw-hover:bg-green-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded"
                    >
                      Run
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleStop}
                        className="tw-bg-red-500 tw-hover:bg-red-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded tw-mr-2"
                      >
                        Stop
                      </button>
                      <button
                        onClick={() => handleUpdateSubmit(index)}
                        className="tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded"
                      >
                        Submit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Stopwatch;