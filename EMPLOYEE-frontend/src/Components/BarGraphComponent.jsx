import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarGraphComponent = ({ data }) => {
  return (
    <div className="tw-p-20">
      <h2><b>Bar Graph</b></h2>
      <BarChart width={400} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="timeElapsed" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarGraphComponent;
