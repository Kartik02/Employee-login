import React from 'react';
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
  );
};

export default BarGraphComponent;
