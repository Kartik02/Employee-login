import React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';

const PieChartComponent = ({ data }) => {
  
  return (
    <div>
      <h2>Pie Chart</h2>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
