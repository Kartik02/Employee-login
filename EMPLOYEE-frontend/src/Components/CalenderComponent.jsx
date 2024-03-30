import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import TimeTable from './TimeTable';

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
      <div className='tw-flex tw-justify-end'>
        <button onClick={() => setShowCalendar(!showCalendar)} className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-mt-4 tw-mb-2">
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </button>
      </div>
      {showCalendar && (
        <div className='tw-flex tw-justify-end'>
          <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <button onClick={prevMonth} className="tw-bg-gray-200 tw-p-2 tw-rounded-lg">
                <ChevronLeftIcon className="tw-h-4 tw-w-4 tw-text-gray-600" />
              </button>
              <h2 className="tw-text-xl tw-font-bold">{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
              <button onClick={nextMonth} className="tw-bg-gray-200 tw-p-2 tw-rounded-lg">
                <ChevronRightIcon className="tw-h-4 tw-w-4 tw-text-gray-600" />
              </button>
            </div>
            <Calendar value={date} onChange={onChange} />
          </div>
        </div>
      )}
      <TimeTable/>
    </>
  );
};

export default CalendarComponent;
