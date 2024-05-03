import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

const ProjectDropdown = ({ projectName, setProjectName, projects }) => {
  const handleProjectSelect = (selectedProject) => {
    setProjectName(selectedProject);
  };

  return (
    <div className="relative flex-1">
      <select
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="border border-gray-500 px-2 py-1 mr-2 flex-1"
      >
        <option value="">Select Project</option>
        {projects.map((project, index) => (
          <option key={index} value={project}>
            {project}
          </option>
        ))}
      </select>
    </div>
  );
};

const TagListDropdown = ({ tags, selectedTags, handleTagSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTagClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCheckboxChange = (tag) => {
    handleTagSelect(tag);
  };

  return (
    <div className="relative inline-block">
      <button
        className="border border-gray-500 px-2 py-1 cursor-pointer"
        onClick={handleTagClick}
        style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} // Adjust border radius to match the Project dropdown button
      >
        TagList
      </button>
      {showDropdown && (
        <div className="absolute mt-1 bg-white shadow-md rounded-md border border-gray-500" style={{ width: '150px' }}>
          {tags.map((tag, index) => (
            <label key={index} className="block px-3 py-2 cursor-pointer hover:bg-gray-200">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleCheckboxChange(tag)}
                className="mr-2 cursor-pointer"
              />
              {tag.tag}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Stopwatch = () => {
  const [task, setTask] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      startTimer();
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    fetchProjects();
    fetchTags(); // Fetch tags when component mounts
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/project_list');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tag_list');
      setTags(response.data.tags); // Assuming the response contains an array of tag objects with a 'tag' property
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

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
    clearInterval(intervalRef.current);
    setTimeElapsed(0);
    setPausedTime(0);
  };

  const handleTagSelect = (selectedTag) => {
    if (selectedTags.includes(selectedTag)) {
      setSelectedTags(selectedTags.filter(tag => tag !== selectedTag));
    } else {
      setSelectedTags([...selectedTags, selectedTag]);
    }
  };

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
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
        <TagListDropdown tags={tags} selectedTags={selectedTags} handleTagSelect={handleTagSelect} />
      </div>
    </div>
  );
};

export default Stopwatch;
