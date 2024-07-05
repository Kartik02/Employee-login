import React, { useEffect, useRef, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import axios from 'axios' 
import { universalurl } from '../helper'

const MainChart = () => {
  const chartRef = useRef(null)
  const [chartData, setChartData] = useState({ labels: [], datasets: [] })
  // const [chartData, setChartData] = useState({
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       label: 'Total Work Done',
  //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       pointBackgroundColor: 'rgba(75, 192, 192, 1)',
  //       pointBorderColor: '#fff',
  //       pointHoverBackgroundColor: '#fff',
  //       pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
  //       borderWidth: 2,
  //       data: [65, 59, 80, 100, 56, 55],
  //       fill: true,
  //     },
  //   ],
  // })

  // useEffect(() => {
  //   // Use dummy data instead of fetching from server
  //   const dummyData = [
  //     { month: '01', year: '2023', total_work_done: 65 },
  //     { month: '02', year: '2023', total_work_done: 59 },
  //     { month: '03', year: '2023', total_work_done: 80 },
  //     { month: '04', year: '2023', total_work_done: 81 },
  //     { month: '05', year: '2023', total_work_done: 56 },
  //     { month: '06', year: '2023', total_work_done: 55 },
  //   ];

  //   const labels = dummyData.map(item => `${item.month}/${item.year}`);
  //   const dataset = {
  //     label: 'Total Work Done',
  //     backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //     borderColor: 'rgba(75, 192, 192, 1)',
  //     pointBackgroundColor: 'rgba(75, 192, 192, 1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
  //     borderWidth: 2,
  //     data: dummyData.map(item => item.total_work_done),
  //     fill: true,
  //   };

  //   setChartData({
  //     labels,
  //     datasets: [dataset],
  //   })
  // }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${universalurl}/auth/wavelength_graph`) // Ensure this URL matches your Flask server URL
        const data = response.data

        const labels = data.map(item => `${item.month}/${item.year}`);
        const dataset = {
          label: 'Total Work Done',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: data.map(item => item.total_work_done),
          fill: true,
        };


        setChartData({
          labels,
          datasets: [dataset],
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const updateChartColors = () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', updateChartColors)

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', updateChartColors)
    }
  }, [])

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '200px', marginTop: '40px' }}
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: 50,
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 5,
              hitRadius: 10,
              hoverRadius: 7,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart

