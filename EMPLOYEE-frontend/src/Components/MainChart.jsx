// import React, { useEffect, useRef } from 'react'
//
// import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle } from '@coreui/utils'
//
// const MainChart = () => {
//   const chartRef = useRef(null)
//
//   useEffect(() => {
//     document.documentElement.addEventListener('ColorSchemeChange', () => {
//       if (chartRef.current) {
//         setTimeout(() => {
//           chartRef.current.options.scales.x.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.options.scales.y.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.update()
//         })
//       }
//     })
//   }, [])
//
//   const random = () => Math.round(Math.random() * 100)
//
//   return (
//     <>
//       <CChartLine
//         ref={chartRef}
//         style={{ height: '200px', marginTop: '40px' }}
//         data={{
//           labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//           datasets: [
//             {
//               label: 'My First dataset',
//               backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
//               borderColor: getStyle('--cui-info'),
//               pointHoverBackgroundColor: getStyle('--cui-info'),
//               borderWidth: 2,
//               data: [
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//               ],
//               fill: true,
//             },
//             {
//               label: 'My Second dataset',
//               backgroundColor: 'transparent',
//               borderColor: getStyle('--cui-success'),
//               pointHoverBackgroundColor: getStyle('--cui-success'),
//               borderWidth: 2,
//               data: [
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//               ],
//             },
//             {
//               label: 'My Third dataset',
//               backgroundColor: 'transparent',
//               borderColor: getStyle('--cui-danger'),
//               pointHoverBackgroundColor: getStyle('--cui-danger'),
//               borderWidth: 1,
//               borderDash: [8, 5],
//               data: [65, 65, 65, 65, 65, 65, 65],
//             },
//           ],
//         }}
//         options={{
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false,
//             },
//           },
//           scales: {
//             x: {
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//                 drawOnChartArea: false,
//               },
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//               },
//             },
//             y: {
//               beginAtZero: true,
//               border: {
//                 color: getStyle('--cui-border-color-translucent'),
//               },
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//               },
//               max: 250,
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//                 maxTicksLimit: 5,
//                 stepSize: Math.ceil(250 / 5),
//               },
//             },
//           },
//           elements: {
//             line: {
//               tension: 0.4,
//             },
//             point: {
//               radius: 0,
//               hitRadius: 10,
//               hoverRadius: 4,
//               hoverBorderWidth: 3,
//             },
//           },
//         }}
//       />
//     </>
//   )
// }
//
// export default MainChart
// //done





import React, { useEffect, useRef, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import axios from 'axios'

const MainChart = () => {
  const chartRef = useRef(null)
  const [chartData, setChartData] = useState({ labels: [], datasets: [] })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ten-tuuo.onrender.com/auth/wavelength_graph') // Ensure this URL matches your Flask server URL
        const data = response.data

        const labels = data.map(item => `${item.month}/${item.year}`);
        const dataset = {
          label: 'Total Work Done',
          backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
          borderColor: getStyle('--cui-info'),
          pointHoverBackgroundColor: getStyle('--cui-info'),
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
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart