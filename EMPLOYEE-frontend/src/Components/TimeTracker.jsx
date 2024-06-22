import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Stopwatch = () => {
  const [task, setTask] = useState("");
  const [projectName, setProjectName] = useState("");
  const [tags, setTags] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [projects, setProjects] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [hoveredColumnIndex, setHoveredColumnIndex] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const intervalRef = useRef();

  // // Dummy data
  // const dummyProjects = ["Project A", "Project B", "Project C"];
  // const dummyTags = [

  //   { name: "aaa", checked: false },
  //   { name: "bbb", checked: false },
  //   { name: "ccc", checked: false },
  //   { name: "ddd", checked: false },
  //   { name: "eee", checked: false },
  // ];
  // const dummySubmittedDetails = [
  //   {
  //     projectName: "Project A",
  //     task: "Initial Setup",
  //     tags: ["aaa"],
  //     timeTaken: "01:00:00",
  //     projectid: 1,
  //     createdDate: new Date("2024-06-11"),
  //   },
  // ];

  useEffect(() => {
    fetchProjects();
    fetchTags();
    fetchEmployeeProjects();
  }, []);

  // const fetchProjects = () => {
  //   setTimeout(() => {
  //     setProjects(dummyProjects);
  //   }, 500); // Simulate API delay
  // };

  // const fetchTags = () => {
  //   setTimeout(() => {
  //     setTags(dummyTags);
  //   }, 500); // Simulate API delay
  // };

  // const fetchEmployeeProjects = () => {
  //   setTimeout(() => {
  //     setSubmittedDetails(dummySubmittedDetails);
  //   }, 500); // Simulate API delay
  // };

  const fetchProjects = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get('https://rmbackend.vercel.app/auth/project_list');
=======
      const response = await axios.get(
        "https://rmbackend.vercel.app/auth/project_list"
      );
>>>>>>> 1cf743038ac42a86793584312849e84d38676e2a
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTags = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get('https://rmbackend.vercel.app/auth/tag_list');
      setTags(response.data.tags.map(tag => ({ name: tag.tag, checked: false })));
=======
      const response = await axios.get(
        "https://rmbackend.vercel.app/auth/tag_list"
      );
      setTags(
        response.data.tags.map((tag) => ({ name: tag.tag, checked: false }))
      );
>>>>>>> 1cf743038ac42a86793584312849e84d38676e2a
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchEmployeeProjects = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get('https://rmbackend.vercel.app/auth/get_employee_projects', { withCredentials: true });
=======
      const response = await axios.get(
        "https://rmbackend.vercel.app/auth/get_employee_projects",
        { withCredentials: true }
      );
>>>>>>> 1cf743038ac42a86793584312849e84d38676e2a
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

  const handleSubmit = () => {
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
      createdDate: new Date(),
    };

    console.log('Sending data:', { task, projectName, tags: selectedTags, timeElapsed });

<<<<<<< HEAD
    // Simulate API call
    setTimeout(() => {
      const projectid = submittedDetails.length + 1; // Simulate project ID generation
      setSubmittedDetails([...submittedDetails, { ...newDetails, projectid }]);
=======
    try {
      const response = await axios.post(
        "https://rmbackend.vercel.app/auth/add_project_data",
        {
          task,
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
>>>>>>> 1cf743038ac42a86793584312849e84d38676e2a
      handleReset();
    }, 500); // Simulate API delay
  };

  const handleUpdateSubmit = (index) => {
    const detail = submittedDetails[index];
    const projectId = detail.projectid; // Retrieve projectid from project detail object
<<<<<<< HEAD

    // Simulate API call
    setTimeout(() => {
=======
    try {
      await axios.post(
        `https://rmbackend.vercel.app/auth/update_project_data/${projectId}`,
        {
          projectid: projectId,
          task: detail.task,
          projectName: detail.projectName,
          tags: detail.tags,
          timeElapsed: timeToMilliseconds(detail.timeTaken),
        }
      );
>>>>>>> 1cf743038ac42a86793584312849e84d38676e2a
      setEditIndex(null);
    }, 500); // Simulate API delay
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

  const filteredDetails = filterDate
    ? submittedDetails.filter(
      detail => detail.createdDate.toDateString() === filterDate.toDateString()
    )
    : submittedDetails;

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
          <div className="absolute tw-right-0">
            <div
              className="tw-border tw-border-gray-500 tw-px-2 tw-py-1 tw-cursor-pointer"
              onClick={handleTagClick}
              style={{ marginRight: '8px' }}
            >
              {tags.filter(tag => tag.checked).length > 0 ? tags.filter(tag => tag.checked).slice(0, 3).map(tag => tag.name).join(", ") : <i className="bi bi-tag"></i>}
              {tags.filter(tag => tag.checked).length > 3 && <span> ...</span>}
            </div>
            {showDropdown && (
              <div className="tw-absolute tw-mt-1 tw-z-50 tw-bg-base-300 tw-shadow-md tw-rounded-md" style={{ color: 'black', right: "115px" }}>
                <ul>
                  {tags.map((tag, index) => (
                    <li key={index} className="tw-cursor-pointer tw-text-base-content tw-px-3 tw-py-2 tw-hover:bg-gray-200">
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
        <div className="tw-mb-4">
          <DatePicker
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            isClearable
            placeholderText="Filter date"
            className="tw-border tw-border-base-content tw-p-2"
          />
        </div>
        <table className="tw-mt-4 tw-border tw-border-base-content tw-w-full">
          <thead>
            <tr>
              <th className="tw-border tw-p-2 tw-w-1/6">Project Name</th>
              <th className="tw-border tw-p-2 tw-w-1/6">Description</th>
              <th className="tw-border tw-p-2 tw-w-1/6">Tag</th>
              <th className="tw-border tw-p-2 tw-w-1/6">Time Taken</th>
              <th className="tw-border tw-p-2 tw-w-1/6">Created Date</th>
              <th className="tw-border tw-p-2 tw-w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetails.map((detail, index) => (
              <tr
                key={index}
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => {
                  setHoveredRowIndex(null);
                  setHoveredColumnIndex(null);
                }}
                className="tw-relative"
              >
                <td className="tw-border tw-p-2 tw-w-1/6">{detail.projectName}</td>
                <td className="tw-border tw-p-2 tw-w-1/6">{detail.task}</td>
                <td
                  className="tw-border tw-p-2 tw-w-1/6"
                  onMouseEnter={() => setHoveredColumnIndex(index)}
                >
                  {detail.tags.slice(0, 2).join(", ")}
                  {detail.tags.length > 2 && <span> ...</span>}
                  {hoveredRowIndex === index && hoveredColumnIndex === index && (
                    <div className="tw-absolute tw-border tw-border-base-content tw-bg-base-300 tw-text-base-content  tw-p-2 tw-mt-2 tw-z-10" style={{ top: '-20%', left: '45%', transform: 'translateX(-50%)', minWidth: '100px' }}>
                      {detail.tags.map((tag, i) => (
                        <span key={i} className="tw-text-xs tw-bg-transparent tw-block">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="tw-border tw-p-2 tw-w-1/6">{detail.timeTaken}</td>
                <td className="tw-border tw-p-2 tw-w-1/6">{detail.createdDate.toDateString()}</td>
                <td className="tw-border tw-p-2 tw-w-1/6">
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
