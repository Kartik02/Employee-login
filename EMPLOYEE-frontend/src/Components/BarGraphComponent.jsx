import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { universalurl } from '../helper';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
        const response = await axios.get(`${universalurl}/auth/project_time`);
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

  const getChartOptions = () => {
    const isSmallScreen = window.innerWidth <= 576;
    const isMediumScreen = window.innerWidth <= 768;
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: isSmallScreen ? 10 : isMediumScreen ? 12 : 14,
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: isSmallScreen ? 10 : isMediumScreen ? 12 : 14,
            },
          },
        },
      },
    };
  };

  const containerStyle = {
    height: window.innerWidth <= 576 ? '40vh' : window.innerWidth <= 768 ? '45vh' : '45vh',
    width: '100%',
  };

  return (
    <CRow>
      <CCol>
        <CCard className="my-1 tw-h-full">
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody className="tw-w-full d-flex justify-content-center" style={{ height: '100%', width: '100%' }}>
            <div style={containerStyle}>
              <Bar data={chartData} options={getChartOptions()} />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Charts;