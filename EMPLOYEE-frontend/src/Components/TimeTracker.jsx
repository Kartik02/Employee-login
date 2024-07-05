import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { universalurl } from "../helper";
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
  const [projectid, setProjectid] = useState("");
  const intervalRef = useRef();

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRowExpansion = (index) => {
    if (expandedRows[index]) {
      clearTimeout(expandedRows[index].timer);
      setExpandedRows((prev) => {
        const newExpandedRows = { ...prev };
        delete newExpandedRows[index];
        return newExpandedRows;
      });
    } else {
      const timer = setTimeout(() => {
        setExpandedRows((prev) => {
          const newExpandedRows = { ...prev };
          delete newExpandedRows[index];
          return newExpandedRows;
        });
      }, 3000);

      setExpandedRows((prev) => ({
        ...prev,
        [index]: { timer },
      }));
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTags();
    fetchEmployeeProjects(); // Fetch employee projects when component mounts
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${universalurl}/auth/project_list`
      );
      setProjects(response.data);
    }
    
    catch (error) {
      console.error("Error fetching projects:", error);
    }
    
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(
        `${universalurl}/auth/tag_list`
      );
      setTags(
        response.data.tags.map((tag) => ({ name: tag.tag, checked: false }))
      );
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchEmployeeProjects = async () => {
    try {
      const response = await axios.get(
        `${universalurl}/auth/get_employee_projects`,
        { withCredentials: true }
      );
      const employeeProjects = response.data.projects;
      // Assuming the employeeProjects data format is similar to the submittedDetails state
      setSubmittedDetails(employeeProjects.map(project => ({
        projectid: project.projectid,
        projectName: project.projectName,
        task: project.task,
        tags: project.tags,
        timeTaken: formatTime(project.timeElapsed),
        timeElapsed: project.timeElapsed // Add timeElapsed to state
      })));
    } catch (error) {
      console.error("Error fetching employee projects:", error);
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
    setTags(tags.map((tag) => ({ ...tag, checked: false })));
  };

  const handleRun = (index) => {
    if (isRunning) return; // Prevent running if already running
    setEditIndex(index);
    const startTime = Date.now() - submittedDetails[index].timeElapsed; // Initialize timer with stored timeElapsed
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newDetails = [...submittedDetails];
      newDetails[index].timeTaken = formatTime(elapsedTime);
      newDetails[index].timeElapsed = elapsedTime; // Update timeElapsed in state
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
    const updatedTags = tags.map((tag) =>
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
    if (!projectid.trim()) {
      alert("Project ID is required!");
      return;
    }
    const selectedTags = tags
      .filter((tag) => tag.checked)
      .map((tag) => tag.name);
  
    const newDetails = {
      projectid,
      projectName,
      task,
      tags: selectedTags,
      timeTaken: formatTime(timeElapsed),
    };
  
    console.log("Sending data:", {
      task,
      projectid,  // Include projectid in the console log for verification
      projectName,
      tags: selectedTags,
      timeElapsed,
    });
  
    try {
      const response = await axios.post(
        `${universalurl}/auth/add_project_data`,
        {
          task,
          projectid,  // Include projectid in the request payload
          projectName,
          tags: selectedTags,
          timeElapsed,
          empid: "2001",
        }
      );
      setSubmittedDetails([
        ...submittedDetails,
        { ...newDetails, projectid: response.data.projectid },
      ]);
      handleReset();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleUpdateSubmit = async (index) => {
    const detail = submittedDetails[index];
    const projectId = detail.projectid; // Retrieve projectid from project detail object
    try {
      await axios.post(
        `${universalurl}/auth/update_project_data/${projectId}`,
        {
          projectid: projectId,
          task: detail.task,
          projectName: detail.projectName,
          tags: detail.tags,
          timeElapsed: timeToMilliseconds(detail.timeTaken),
        }
      );
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const timeToMilliseconds = (timeString) => {
    if (!timeString) {
      return 0;
    }
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-center tw-p-4">
    <div className="tw-mb-4 tw-border-2 tw-border-base-content tw-rounded tw-p-2 md:tw-flex tw-w-full">
      <input
        type="text"
        placeholder="Project ID"
        value={projectid}
        onChange={(e) => setProjectid(e.target.value)}
        className="tw-mr-2 tw-input tw-input-bordered tw-flex-grow"
      />
      <input
        type="text"
        placeholder="What are you working on?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="tw-mr-2 tw-input tw-input-bordered tw-flex-grow"
      />
      <div className="tw-relative">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          onClick={handleTagClick}
          className="tw-mr-2 tw-input tw-input-bordered tw-flex-grow"
        />
        <div className="tw-absolute tw-top-full tw-left-0 tw-right-0 tw-bg-white tw-shadow-md tw-z-10">
          {showDropdown && (
            <ul className="tw-list-none tw-p-2">
              {projects.map((project, index) => (
                <li
                  key={index}
                  className="tw-py-2 tw-cursor-pointer hover:tw-bg-gray-200"
                  onClick={() => {
                    setProjectName(project);
                    setShowDropdown(false);
                  }}
                >
                  {project}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        className="tw-mr-2 tw-btn tw-btn-primary"
        onClick={isRunning ? handlePause : handleStart}
        disabled={!projectName}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        className="tw-mr-2 tw-btn tw-btn-secondary"
        onClick={handleResume}
        disabled={isRunning || !pausedTime}
      >
        Resume
      </button>
      <button
        className="tw-mr-2 tw-btn tw-btn-accent"
        onClick={handleReset}
      >
        Reset
      </button>
      <button className="tw-btn tw-btn-success" onClick={handleSubmit}>
        Submit
      </button>
    </div>
    <div className="tw-mb-4">
      <button
        className="tw-btn tw-btn-outline"
        onClick={handleTagClick}
      >
        Select Tags
      </button>
      {showDropdown && (
        <div className="tw-relative">
          <ul className="tw-list-none tw-p-2 tw-bg-white tw-shadow-md tw-absolute tw-z-10">
            {tags.map((tag, index) => (
              <li key={index} className="tw-flex tw-items-center tw-py-2">
                <input
                  type="checkbox"
                  checked={tag.checked}
                  onChange={() => handleTagSelect(tag.name)}
                  className="tw-mr-2"
                />
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className="tw-overflow-x-auto">
      <table className="tw-table tw-w-full">
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Task</th>
            <th>Tags</th>
            <th>Time Taken</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submittedDetails.map((detail, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{detail.projectid}</td>
                <td>{detail.projectName}</td>
                <td>{detail.task}</td>
                <td>{detail.tags.join(", ")}</td>
                <td>{detail.timeTaken}</td> {/* Display formatted timeElapsed */}
                <td>
                  <button
                    className="tw-btn tw-btn-xs tw-btn-primary tw-mr-2"
                    onClick={() => handleRun(index)}
                    disabled={isRunning}
                  >
                    Run
                  </button>
                  <button
                    className="tw-btn tw-btn-xs tw-btn-secondary tw-mr-2"
                    onClick={handleStop}
                  >
                    Stop
                  </button>
                  <button
                    className="tw-btn tw-btn-xs tw-btn-accent tw-mr-2"
                    onClick={() => toggleRowExpansion(index)}
                  >
                    {expandedRows[index] ? "Hide" : "Show"} Details
                  </button>
                </td>
              </tr>
              {expandedRows[index] && (
                <tr>
                  <td colSpan="6">
                    <div className="tw-p-4 tw-bg-gray-100 tw-rounded tw-mb-2">
                      <div className="tw-mb-2">
                        <strong>Task:</strong> {detail.task}
                      </div>
                      <div className="tw-mb-2">
                        <strong>Tags:</strong> {detail.tags.join(", ")}
                      </div>
                      <div className="tw-mb-2">
                        <strong>Time Taken:</strong> {detail.timeTaken}
                      </div>
                      <button
                        className="tw-btn tw-btn-xs tw-btn-primary tw-mr-2"
                        onClick={() => handleUpdateSubmit(index)}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    </>
  );

};

export default Stopwatch;
