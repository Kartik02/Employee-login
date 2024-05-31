import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JoinMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to fetch meeting data from the backend
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('https://rmbackend.vercel.app/auth/meetings');
        const formattedMeetings = response.data.map(meeting => {
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
        });
        setMeetings(formattedMeetings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meetings:', error);
        setError('Error fetching meetings');
        setLoading(false);
      }
    };

    fetchMeetings(); // Call the fetchMeetings function when component mounts
  }, []);

  const handleJoinMeeting = (meetingCode) => {
    // Redirect to the Google Meet URL with the meeting code appended
    const meetURL = `https://meet.google.com/${meetingCode}`;
    window.open(meetURL, '_blank');
  };

  if (loading) {
    return <div>Loading meetings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
