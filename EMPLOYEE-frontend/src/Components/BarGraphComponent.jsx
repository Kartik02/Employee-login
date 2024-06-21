import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';

const Charts = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Time Spent on Projects',
        backgroundColor: '#f87979',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchProjectTime = async () => {
      try {
        const response = await axios.get('https://ten-tuuo.onrender.com/auth/project_time');
        const projects = response.data;
        const labels = projects.map(project => project.projectName);
        const data = projects.map(project => project.totalTime);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Total Time Spent on Projects',
              backgroundColor: '#f87979',
              data: data,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching project times:', error);
      }
    };

    fetchProjectTime();
  }, []);
  const options = {
    responsive: true,
  };
  return (
    <CRow>
      <CCol>
        <CCard className="my-1 tw-h-full">
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody className="w-100 d-flex justify-content-center" >
            <CChartBar className="w-100" data={chartData} options={options} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Charts;
