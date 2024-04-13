import React, { useState } from 'react';
import ProjectList from './ProjectList';

const ProjectManagement = () => {
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);
  const [dropdown3Open, setDropdown3Open] = useState(false);
  const [dropdown4Open, setDropdown4Open] = useState(false);

  const toggleDropdown1 = () => setDropdown1Open(!dropdown1Open);
  const toggleDropdown2 = () => setDropdown2Open(!dropdown2Open);
  const toggleDropdown3 = () => setDropdown3Open(!dropdown3Open);
  const toggleDropdown4 = () => setDropdown4Open(!dropdown4Open);

  return (
    <>
    <div className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-bg-gray-200">
      {/* Dropdown button 1 */}
      <div className="tw-relative">
        <button
          onClick={toggleDropdown1}
          className="tw-px-4 tw-py-2 tw-text-gray-800 tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-md tw-hover:bg-gray-100 tw-focus:outline-none tw-focus:ring tw-focus:ring-blue-500"
        >
          Active
        </button>
        {/* Dropdown content */}
        {dropdown1Open && (
          <div className="tw-absolute tw-left-0 tw-z-10 tw-mt-1 tw-w-full tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-lg">
            {/* Dropdown items */}
            <button className="tw-block tw-px-4 tw-py-2 tw-text-gray-800 tw-hover:bg-gray-100 tw-w-full tw-text-left">Active</button>
            <button className="tw-block tw-px-4 tw-py-2 tw-text-gray-800 tw-hover:bg-gray-100 tw-w-full tw-text-left">Archieved</button>
            <button className="tw-block tw-px-4 tw-py-2 tw-text-gray-800 tw-hover:bg-gray-100 tw-w-full tw-text-left">All</button>
            {/* Add more options as needed */}
          </div>
        )}
      </div>

      {/* Dropdown button 2 */}
      <div className="tw-relative">
        <button
          onClick={toggleDropdown2}
          className="tw-px-4 tw-py-2 tw-text-gray-800 tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-md tw-hover:bg-gray-100 tw-focus:outline-none tw-focus:ring tw-focus:ring-blue-500"
        >
          Client
        </button>
        {/* Dropdown content */}
        {dropdown2Open && (
          <div className="tw-absolute tw-left-0 tw-z-10 tw-mt-1 tw-w-full tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-lg">
            {/* Dropdown items */}
            <button className="tw-block tw-px-4 tw-py-2 tw-text-gray-800 tw-hover:bg-gray-100 tw-w-full tw-text-left">Select All</button>
            <button className="tw-block tw-px-4 tw-py-2 tw-text-gray-800 tw-hover:bg-gray-100 tw-w-full tw-text-left">Without Clients</button>
            {/* Add more options as needed */}
          </div>
        )}
      </div>

      {/* Dropdown button 3 */}
      <div className="tw-relative">
        <button
          onClick={toggleDropdown3}
          className="tw-px-4 tw-py-2 tw-text-gray-800 tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-md tw-hover:bg-gray-100 tw-focus:outline-none tw-focus:ring tw-focus:ring-blue-500"
        >
          Access
        </button>
        {/* Dropdown content */}
        {dropdown3Open && (
          <div className="tw-absolute tw-left-0 tw-z-10 tw-mt-1 tw-w-full tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-lg">
            {/* Dropdown items */}
            <button className="tw-block tw-px-4 tw-py-2 tw-text-gray-800 tw-hover:bg-gray-100 tw-w-full tw-text-left">Select All</button>
            <button className="tw-block tw-px-4 tw-py-2 tw-text-gray-800 tw-hover:bg-gray-100 tw-w-full tw-text-left">HR team</button>
            {/* Add more options as needed */}
          </div>
        )}
      </div>

      {/* Dropdown button 4 */}
      <div className="tw-relative">
        <button
          onClick={toggleDropdown4}
          className="tw-px-4 tw-py-2 tw-text-gray-800 tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-md tw-hover:bg-gray-100 tw-focus:outline-none tw-focus:ring tw-focus:ring-blue-500"
        >
          Billing
        </button>
        {/* Dropdown content */}
        {dropdown4Open && (
          <div className="tw-absolute tw-left-0 tw-z-10 tw-mt-1 tw-w-full tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-lg">
            {/* Dropdown items */}
            <button className="tw-block tw-px-4 tw-py-2 tw-text-gray-800 tw-hover:bg-gray-100 tw-w-full tw-text-left">Billable</button>
            <button className="tw-block tw-px-4 tw-py-2 tw-text-gray-800 tw-hover:bg-gray-100 tw-w-full tw-text-left">Non-Billable</button>
            {/* Add more options as needed */}
          </div>
        )}
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search..."
        className="tw-flex-grow tw-px-4 tw-py-2 tw-ml-4 tw-text-gray-800 tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-md tw-focus:outline-none tw-focus:ring tw-focus:ring-blue-500"
      />
    </div>
   <ProjectList/>
    </>
  );
};

export default ProjectManagement;
