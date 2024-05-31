import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JoinMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  useEffect(() => {
    // Function to fetch logged-in user's email
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get('https://rmbackend.vercel.app/auth/employee', {
          withCredentials: true,
        });
        setLoggedInEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching logged-in user data:', error);
      }
    };

    fetchLoggedInUser(); // Call the fetchLoggedInUser function when component mounts
  }, []);

  useEffect(() => {
    // Function to fetch meeting data from the backend
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('https://rmbackend.vercel.app/auth/meetings');
        const filteredMeetings = response.data.filter(meeting => meeting.attendees.includes(loggedInEmail)); // Filter meetings based on logged-in user's email
        setMeetings(filteredMeetings.map(meeting => {
          const meetingDate = new Date(`${meeting.date}T${meeting.time}`);
          return {
            ...meeting,
            // Format date as "dd-mm-yyyy"
            date: meetingDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }),
            // Format time as "HH:MM AM/PM"
            time: meetingDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          };
        })); // Set the fetched meetings in state
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    if (loggedInEmail) {
      fetchMeetings(); // Call the fetchMeetings function when logged-in user's email is available
    }
  }, [loggedInEmail]);

  const handleJoinMeeting = (meetingCode) => {
    // Redirect to the Google Meet URL with the meeting code appended
    const meetURL = `https://meet.google.com/${meetingCode}`;
    window.open(meetURL, '_blank');
  };

  if (!Array.isArray(meetings) || !meetings.length) {
    return <div>No meetings available</div>;
  }

  return (
    <div className="row">
      {meetings.map((meeting, index) => (
        <div key={index} className="col-sm-6 col-lg-4 mb-5">
          <div className="card" style={{ height: '180px', position: 'relative', background: 'linear-gradient(to bottom right, #89CFF0,#007FFF)' }}>
            <div className="card-body">
              <div className="tw-font-bold tw-text-xl tw-mb-2 tw-text-gray-600">{meeting.title}</div>
              <p className="">
                Date: {meeting.date}<br />
                Time: {meeting.time}<br />
                Meeting Code: {meeting.meeting_code}<br />
              </p>
            </div>
            <button
              className="tw-bg-gradient-to-br tw-from-blue-500 tw-to-blue-400 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-px-4 tw-rounded tw-w-full tw-mb-1"
              style={{ position: 'absolute', bottom: '0', left: '0', width: '100%' }}
              onClick={() => handleJoinMeeting(meeting.meeting_code)}
            >
              Join Meeting
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


export default JoinMeeting;
//done





