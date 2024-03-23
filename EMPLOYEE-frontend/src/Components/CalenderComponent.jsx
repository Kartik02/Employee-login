import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const onChange = (value) => {
    setDate(value);
  };

  const prevMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <>
      <div className='flex justify-end'>
        <button onClick={() => setShowCalendar(!showCalendar)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 mb-2">
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </button>
      </div>
      {showCalendar && (
        <div className='flex justify-end'>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <button onClick={prevMonth} className="bg-gray-200 p-2 rounded-lg">
                <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
              </button>
              <h2 className="text-xl font-bold">{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
              <button onClick={nextMonth} className="bg-gray-200 p-2 rounded-lg">
                <ChevronRightIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <Calendar value={date} onChange={onChange} />
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarComponent;
