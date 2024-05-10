import React from 'react';

const JoinMeeting = ({ meeting }) => {
  if (!Array.isArray(meeting) || !meeting.length) {
    return <div>No meetings available</div>;
  }

  return (
    <div className="row">
      {meeting.map((item, index) => (
        <div key={index} className="col-sm-6 col-lg-4 mb-5">
          <div className="card" style={{ height: '180px', position: 'relative', background: 'linear-gradient(to bottom right, #89CFF0,#007FFF)' }}>
            <div className="card-body">
              <div className="tw-font-bold tw-text-xl tw-mb-2 tw-text-gray-600">{item.title}</div>
              <p className="">
                Date: {item.date}<br />
                Time: {item.time}<br />
                Meeting ID: {item.meetingID}<br />
              </p>
            </div>
            <button
              className="tw-bg-gradient-to-br tw-from-blue-500 tw-to-blue-400 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-px-4 tw-rounded tw-w-full tw-mb-1"
              style={{ position: 'absolute', bottom: '0', left: '0', width: '100%' }}
              onClick={(e) => {
                e.stopPropagation();
                alert('Join meeting clicked');
              }}
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




