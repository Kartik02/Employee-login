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
        const response = await axios.get('https://rmbackend.vercel.app/auth/project_time');
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

  return (
    <CRow>
      <CCol>
        <CCard className="my-4">
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody className="w-100">
            <CChartBar className="w-100" data={chartData} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Charts;
