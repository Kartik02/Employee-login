import React from "react";

const TimeTable = () => {
  // Get the current date
  const currentDate = new Date();
  // Get the current day, hour, and minute
  const currentDay = currentDate.toLocaleDateString(undefined, { weekday: 'short' });
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  // Define the table rows based on the current time and date
  const tableRows = [
    { time: "01:00", event: "Event 1" },
    { time: "02:00", event: "Event 2" },
    { time: "03:00", event: "Event 3" },
    // Add more rows as needed
  ];

  return (
    <table className="w-full text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Time</th>
          <th className="border border-gray-300 px-4 py-2" colSpan="7">
            {currentDay}
          </th>
        </tr>
        <tr>
          <th className="border border-gray-300 px-4 py-2">
            <time dateTime={`${currentHour}:${currentMinute}`}>
              {`${currentHour}:${currentMinute}`}
            </time>
          </th>
          <td className="border border-gray-300 px-4 py-2">Mon, Mar 18</td>
          <td className="border border-gray-300 px-4 py-2">Tue, Mar 19</td>
          <td className="border border-gray-300 px-4 py-2">Wed, Mar 20</td>
          <td className="border border-gray-300 px-4 py-2">Thu, Mar 21</td>
          <td className="border border-gray-300 px-4 py-2">Fri, Mar 22</td>
          <td className="border border-gray-300 px-4 py-2">Sat, Mar 23</td>
          <td className="border border-gray-300 px-4 py-2">Sun, Mar 24</td>
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{row.time}</td>
            <td colSpan="7">
              <span className={`bg-${index % 3 === 0 ? "blue" : index % 3 === 1 ? "red" : "green"}-100 text-${index % 3 === 0 ? "blue" : index % 3 === 1 ? "red" : "green"}-800 px-2 py-1 rounded`}>
                {row.event}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeTable;
