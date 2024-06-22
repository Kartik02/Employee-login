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
   
    // layout: {
    //   padding: {
    //     top: 20, // Add padding to ensure space for the legend
    //   },
    // },
    // legend: {
    //   display: true,
    //   position: 'top',
    // },
    tooltips: {
      enabled: false,
    },
  };

  return (
    <CRow>
      <CCol>
        <CCard className="my-1 tw-h-full">
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody className="tw-w-full tw-h-[50vh]  d-flex justify-content-center">
            <div style={{ height: '50vh', width: '100%' }}>
              <CChartBar data={chartData} options={options}/>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Charts;
