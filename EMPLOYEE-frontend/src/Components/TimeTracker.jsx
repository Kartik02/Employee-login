import React, { useState, useRef, useEffect } from "react";
import Reports from "./Reports";

const ProjectDropdown = ({ projectName, setProjectName, projects }) => {
  const handleProjectSelect = (selectedProject) => {
    setProjectName(selectedProject);
  };

  return (
    <div className="tw-relative tw-flex-1">
      {/* Project dropdown */}
      <select
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="tw-border tw-border-gray-500 tw-px-2 tw-py-1 tw-mr-2 tw-flex-1"
      >
        <option value="">Select Project</option>
        {projects.map((project, index) => (
          <option key={index} value={project.projectName}>
            {project.projectName}
          </option>
        ))}
      </select>
    </div>
  );
};

const Stopwatch = () => {
  const [task, setTask] = useState(""); // State for the task description
  const [projectName, setProjectName] = useState("");
  const [tags, setTags] = useState([]); // State for storing selected tags
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [projects, setProjects] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // State to control the visibility of the dropdown

  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      startTimer();
    }
    return () => {
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [isRunning]);

  const startTimer = () => {
    const startTime = Date.now() - pausedTime;
    intervalRef.current = setInterval(() => {
      setTimeElapsed(Date.now() - startTime);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setPausedTime(timeElapsed);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeElapsed(0);
    setPausedTime(0);
  };

  const handleStart = () => {
    if (!task.trim()) {
      alert("Task description is required!");
      return;
    }
    if (!projectName.trim()) {
      alert("Project name is required!");
      return;
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    stopTimer();
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    resetTimer();
    setTask("");
    setProjectName("");
    setTags([]);
    setIsRunning(false);
  };

  const handleSubmit = () => {
    if (!task.trim()) {
      alert("Task description is required!");
      return;
    }
    if (!projectName.trim()) {
      alert("Project name is required!");
      return;
    }
    const newProject = {
      task,
      projectName,
      tags, // Include selected tags in the project object
      timeElapsed: Math.floor(timeElapsed / 1000), // Convert milliseconds to seconds
    };

    fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProject)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to add project');
        }
      })
      .then(data => {
        console.log(data.message);
        setProjects([...projects, newProject]);
        handleReset();
        // Navigate to ProjectDetailsPage with projectName and timeElapsed
        // Assuming you have some kind of routing mechanism like react-router
        // Replace the navigation logic according to your routing library
        navigateToProjectDetailsPage(projectName, Math.floor(timeElapsed / 1000));
      })
      .catch(error => {
        console.error('Error adding project:', error);
        alert('Failed to add project');
      });

  };

  const handleTagClick = () => {
    setShowDropdown(!showDropdown); // Toggle the visibility of the dropdown
  };

  const handleTagSelect = (selectedTag) => {
    // Toggle the tag in the selected tags array
    if (tags.includes(selectedTag)) {
      setTags(tags.filter(tag => tag !== selectedTag));
    } else {
      setTags([...tags, selectedTag]);
    }
  };


  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-center tw-p-4">
        <div className="tw-mb-4 tw-border-2 tw-border-black tw-rounded tw-p-2 tw-flex tw-w-full">
          <input
            type="text"
            placeholder="What are you working on?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="tw-border tw-border-gray-500 tw-px-2 tw-py-1 tw-mr-2 tw-flex-1"
            style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }} // Adjust border radius for left input
          />
          <ProjectDropdown projectName={projectName} setProjectName={setProjectName} projects={projects} />
          <div className="tw-absolute tw-right-80 ">
            {/* Tag symbol */}
            <div
              className="tw-border tw-border-gray-500 tw-px-2 tw-py-1 tw-cursor-pointer"
              onClick={handleTagClick} // Handle click to show dropdown
              style={{ marginRight: '8px' }} // Reduce space between tag and project
            >
              {tags.length > 0 ? tags.join(", ") :<i class="bi bi-tag"></i>}
            </div>
            {/* Dropdown */}
            {showDropdown && (
              <div className="tw-absolute tw-mt-1 tw-bg-white tw-shadow-md tw-rounded-md">
                <ul>
                  <li className="tw-cursor-pointer tw-px-3 tw-py-2 tw-hover:bg-gray-200">
                    <input
                      type="checkbox"
                      value="Frontend"
                      checked={tags.includes("Frontend")}
                      onChange={() => handleTagSelect("Frontend")}
                    />
                    Frontend
                  </li>
                  <li className="tw-cursor-pointer tw-px-3 tw-py-2 tw-hover:bg-gray-200">
                    <input
                      type="checkbox"
                      value="Backend"
                      checked={tags.includes("Backend")}
                      onChange={() => handleTagSelect("Backend")}
                    />
                    Backend
                  </li>
                  <li className="tw-cursor-pointer tw-px-3 tw-py-2 tw-hover:bg-gray-200">
                    <input
                      type="checkbox"
                      value="Database"
                      checked={tags.includes("Database")}
                      onChange={() => handleTagSelect("Database")}
                    />
                    Database
                  </li>
                </ul>
              </div>
            )}
          </div>

          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!task.trim() || !projectName.trim()} // Disable button if task or projectName is empty or contains only whitespace
              className={`tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded ${(!task.trim() || !projectName.trim()) && "tw-opacity-50 tw-cursor-not-allowed"}`}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} // Adjust border radius for start button
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
        {projects.length > 0 && (
          <div className="tw-mb-4">
            <h2 className="tw-font-bold">Project History:</h2>
            <ul>
              {projects.map((project, index) => (
                <li key={index}>
                  Project Name: {project.projectName}, Tags: {project.tags.join(", ")}, Time
                  Elapsed: {project.timeElapsed} seconds
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
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

      </div>
    </>
  );
};

export default Stopwatch;
