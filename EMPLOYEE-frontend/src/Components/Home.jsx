import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import Reports from './Reports'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import CalenderComponent from './CalenderComponent'
//import TeamActivities from './TeamActivities'
import JoinMeeting from './JoinMeeting';
import classNames from 'classnames'
import {

  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CWidgetStatsA,

} 
from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilCloudDownload} from '@coreui/icons'
import MainChart from './MainChart'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState(["shanoo"])
  const [show, setShow] = useState(false)
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['gray', 'black']; // Define your colors here

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [colors.length]);


  //add data from join meeting
  const meeting = [
    {
      title: "Meeting Title 1",
      date: "2024-05-06",
      time: "14:00",
      meetingID: "123456789",
    },
    {
      title: "Meeting Title 2",
      date: "2024-05-06",
      time: "15:00",
      meetingID: "123456789",
    },
    {
      title: "Meeting Title 3",
      date: "2024-05-06",
      time: "16:00",
      meetingID: "123456789",
    },
    {
      title: "Meeting Title 4",
      date: "2024-05-06",
      time: "17:00",
      meetingID: "123456789",
    }
    ,
    {
      title: "Meeting Title 3",
      date: "2024-05-06",
      time: "16:00",
      meetingID: "123456789",
    },
    {
      title: "Meeting Title 4",
      date: "2024-05-06",
      time: "17:00",
      meetingID: "123456789",
    }
  ]

  // // State variables
  // const [isMeetingRunning, setIsMeetingRunning] = useState(false);
  // const [showJoinForm, setShowJoinForm] = useState(true);

  // // Function to handle join meeting form submission
  // const handleJoinMeeting = () => {
  //   // Check if meeting is already running
  //   if (isMeetingRunning) {
  //     alert('Meeting is already running.');
  //     setShowJoinForm(false); // Hide the join form
  //   } else {
  //     // Show join meeting form
  //     setShowJoinForm(true);
  //     // Here you can implement the logic to join the meeting
  //   }
  // };

  // // Function to handle meeting creation
  // const handleCreateMeeting = () => {
  //   // Set meeting status to running
  //   setIsMeetingRunning(true);
  //   // Show join form
  //   setShowJoinForm(true);
  // };


  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
  }
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp)
        } else {
          alert(result.data.Error)
        }
      })
  }

  const showName = () => {
    if (show === true) {
      setShow(false)
    } else {
      setShow(true)
    }
  }
  return (
    <>
      <div className='w-100 tw-px-5 tw-bg-gray-700'>
        <div className='tw-flex tw-justify-between tw-items-center px-4'>
          <h2
            className={`py-5 tw-font-bold tw-pl-5`}
            style={{
              color: colors[colorIndex],
              transition: 'color 0.5s ease-in-out', // Smooth transition for color change
              fontSize: '2rem'
            }}
          >
            Dashboard
          </h2>
          <button className=" tw-bg-gray-800 btn btn-dark h-25" onClick={showName}>calendar</button>
        </div>
        {
          show && (<CalenderComponent />)
        }



        <JoinMeeting meeting={meeting} />

        <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                {/* <CIcon icon={cilCloudDownload} /> */}
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>


        {/* <div className='tw-px-5 tw-bg-gray-800'>
          <div className='p-3 md:tw-flex  justify-content-around  tw-gap-1'>
            <div className='tw-mb-10 w-100 px-3 sm:tw-w-100 rounded-2 pt-2 pb-3 border shadow-sm w-25 tw-h-28 tw-bg-green-300 tw-font-bold'>
              <div className='text-center pb-1'>
                <h4>Admin</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>{adminTotal}</h5>
              </div>
            </div>
            <div className=' tw-mb-10 w-100 px-3 rounded-2 pt-2 pb-3 border shadow-sm w-25 tw-h-28 tw-bg-gray-300 tw-font-bold'>
              <div className='text-center pb-1'>
                <h4>Employee</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>{employeeTotal}</h5>
              </div>
            </div>
            <div className=' tw-mb-10 w-100 px-3 rounded-2 pt-2 pb-3 border shadow-sm w-25 tw-h-28 tw-bg-red-300 tw-font-bold'>
              <div className='text-center pb-1'>
                <h4>Salary</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>${salaryTotal}</h5>
              </div>
            </div>
          </div>
          <div className='mt-4 px-5 pt-3 pb-2 rounded-2  bg-body-secondary'>
            <h3 className='tw-font-bold text-center '>List of Admins</h3>
            <table className='table'>
              <thead >
                <tr >
                  <th className=' bg-body-secondary'>Email</th>
                  <th className=' bg-body-secondary'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  admins.map(a => (
                    <tr>
                      <td className='bg-body-secondary'>{a.email}</td>
                      <td className='bg-body-secondary'>
                        <button
                          className="btn btn-info btn-sm me-2">
                          Edit
                        </button>
                        <button
                          className="btn btn-warning btn-sm" >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>  */}

        <CRow className="tw-w-100 tw-mt-5 tw-mb-10" xs={{ gutter: 4 }}>
          <CCol sm={6} xl={4} xxl={3}>
            <CWidgetStatsA
              color="primary"
              value={
                <>
                  26K{' '}
                  <span className="fs-6 fw-normal">
                    (-12.4% )
                  </span>
                </>
              }
              title="Admin"

              chart={
                <CChartLine
                  ref={widgetChartRef1}
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'My First dataset',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-primary'),
                        data: [65, 59, 84, 84, 51, 55, 40],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        border: {
                          display: false,
                        },
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        min: 30,
                        max: 89,
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 1,
                        tension: 0.4,
                      },
                      point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
          <CCol sm={6} xl={4} xxl={3}>
            <CWidgetStatsA
              color="info"
              value={
                <>
                  $6.200{' '}
                  <span className="fs-6 fw-normal">
                    (40.9% )
                  </span>
                </>
              }
              title="Employee"

              chart={
                <CChartLine
                  ref={widgetChartRef2}
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'My First dataset',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-info'),
                        data: [1, 18, 9, 17, 34, 22, 11],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        border: {
                          display: false,
                        },
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        min: -9,
                        max: 39,
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 1,
                      },
                      point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
          <CCol sm={6} xl={4} xxl={3}>
            <CWidgetStatsA
              color="warning"
              value={
                <>
                  2.49%{' '}
                  <span className="fs-6 fw-normal">
                    (84.7% )
                  </span>
                </>
              }
              title="Salary"

              chart={
                <CChartLine
                  className="mt-3"
                  style={{ height: '70px' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,255,255,.2)',
                        borderColor: 'rgba(255,255,255,.55)',
                        data: [78, 81, 80, 45, 34, 12, 40],
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        display: false,
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 2,
                        tension: 0.4,
                      },
                      point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
          <CCol sm={6} xl={4} xxl={3}>
            <CWidgetStatsA
              color="warning"
              value={
                <>
                  2.49%{' '}
                  <span className="fs-6 fw-normal">
                    (84.7% )
                  </span>
                </>
              }
              title="Salary"

              chart={
                <CChartLine
                  className="mt-3"
                  style={{ height: '70px' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,255,255,.2)',
                        borderColor: 'rgba(255,255,255,.55)',
                        data: [78, 81, 80, 45, 34, 12, 40],
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        display: false,
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 2,
                        tension: 0.4,
                      },
                      point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
        </CRow>

        {/* <div className='mt-4 px-5 pt-3 pb-2 rounded-2  bg-body-secondary'>
          <h3 className='tw-font-bold text-center '>List of Admins</h3>
          <table className='table'>
            <thead >
              <tr >
                <th className=' bg-body-secondary'>Email</th>
                <th className=' bg-body-secondary'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                admins.map(a => (
                  <tr>
                    <td className='bg-body-secondary'>{a.email}</td>
                    <td className='bg-body-secondary'>
                      <button
                        className="btn btn-info btn-sm me-2">
                        Edit
                      </button>
                      <button
                        className="btn btn-warning btn-sm" >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div> */}

        <Reports />

        <div className='tw-mt-5'>
          {/* <TeamActivities /> */}
        </div>

      </div>

    </>

  )
}

export default Home

//done
