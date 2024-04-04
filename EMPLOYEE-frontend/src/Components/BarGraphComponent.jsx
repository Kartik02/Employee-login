import React from 'react';
<<<<<<< HEAD
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
=======
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip} from 'recharts';

const BarGraphComponent = ({ data }) => {
  return (
    <div>
        <h2>Bar Chart</h2>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="timeElapsed" fill="#8884d8" />
          <BarTooltip />
        </BarChart>
      </div>
>>>>>>> 07f2507e2057925d04f960dafe13df0d71731a08
  );
};

export default BarGraphComponent;
