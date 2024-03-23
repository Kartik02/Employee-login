import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [tag, setTag] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('stopwatch_notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem('stopwatch_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const storedTime = parseInt(localStorage.getItem('stopwatch_time'), 10);
    const storedIsRunning = localStorage.getItem('stopwatch_isRunning') === 'true';

    if (!isNaN(storedTime)) {
      setTime(storedTime);
    }
    setIsRunning(storedIsRunning);

    // If timer was running before refresh, start the timer again
    if (storedIsRunning) {
      setIsRunning(true);
    }
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (!isRunning) {
      // Start the timer
      setIsRunning(true);
      localStorage.setItem('stopwatch_isRunning', 'true');
    } else {
      // Pause the timer and add note
      setIsRunning(false);
      addNote();
      localStorage.setItem('stopwatch_isRunning', 'false');
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setProjectName('');
    setTag('');
    localStorage.setItem('stopwatch_time', '0');
    localStorage.setItem('stopwatch_isRunning', 'false');
  };

  const addNote = () => {
    if (projectName.trim() !== '') {
      const newNote = { projectName, tag, time: formatTime(time), timestamp: Date.now() };
      setNotes([...notes, newNote]);
      setProjectName('');
      setTag('');
    }
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Enter project name"
          className="border border-gray-400 rounded-md p-2 mr-2"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter tag"
          className="border border-gray-400 rounded-md p-2 mr-2"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <div className="text-4xl  mr-2">{formatTime(time)}</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleTimer}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <div className='flex justify-center'>
        {notes.length > 0 && (
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-2">Notes</h2>
            {notes.map((note, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{note.projectName}: </span>
                <span>{note.tag && `(${note.tag})`} {note.time}</span>
                {note.timestamp && (
                  <span className="ml-2 text-gray-500">(Paused at: {new Date(note.timestamp).toLocaleTimeString()})</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {notes.length === 0 && <p>No project available.</p>}
    </div>
  );
};

export default Stopwatch;
