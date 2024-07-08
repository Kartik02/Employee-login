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
import { universalurl } from '../helper'

const Home = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });


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


  //useEffect(() => {
  //  adminCount();
  //  employeeCount();
  //  salaryCount();
  //  AdminRecords();
  //}, [])

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

  useEffect(() => {
    axios.get(`${universalurl}/auth/admin_count`)
        .then(response => {
            setAdminTotal(response.data.admin_count);
        })
        .catch(error => {
            console.error('Error fetching admin count:', error);
        });

    axios.get(`${universalurl}/auth/employee_count`)
        .then(response => {
            setemployeeTotal(response.data.employee_count);
        })
        .catch(error => {
            console.error('Error fetching employee count:', error);
        });
  }, []);

  const salaryCount = () => {
    axios.get(`${universalurl}/auth/salary_count`)
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
      <div className='tw-w-5/6 m-auto '>
        <div className='tw-flex tw-justify-between tw-items-center px-4'>
          <h2
            className={`py-5 tw-font-bold tw-pl-5`}
            style={{
              color: colors[colorIndex],
              transition: 'color 0.5s ease-in-out', // Smooth transition for color change
              fontSize: '1.6rem'
            }}
          >
            Dashboard
          </h2>
          <button className=" tw-bg-gray-800 btn btn-dark h-25 tw-mx-2 " onClick={showName}>calendar</button>
        </div>
        {
          show && (<CalenderComponent />)
        }



        <JoinMeeting />

        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="" className="card-title mb-0 tw-font-bold tw-text-gray-500">
                  Wavelength
                </h4>
                <div className="small text-body-secondary">{`January - ${currentMonth} ${currentYear}`}</div>
              </CCol>
              <CCol sm={7} className="d-none d-md-block">
               
                {/* <CButtonGroup className="float-end me-3">
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
                </CButtonGroup> */}
              </CCol>
            </CRow>
            <MainChart />
          </CCardBody>
          {/* <CCardFooter>
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
          </CCardFooter> */}
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

        <CRow className="tw-w-100 tw-mt-5 tw-mb-16" xs={{ gutter: 4 }}>
          <CCol sm={6} xl={6} xxl={3}>
            <CWidgetStatsA
              color="primary"
              value={
                <>
                  {adminTotal}{' '}
                  <span className="fs-6 fw-normal">
                    {/* Add percentage or other data if necessary */}
                  </span>
                </>
              }
              title="Admin"

              chart={
                <CChartLine
                  ref={widgetChartRef1}
                  className="mt-3 mx-3 tw-text-base-content "
                  style={{ height: '70px' }}
                 
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'My First dataset',
                        color:'gray',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(130, 141, 133, 1)',
                        pointBackgroundColor: 'rgba(130, 141, 133, 1)',
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
          <CCol sm={6} xl={6} xxl={3}>
            <CWidgetStatsA
              color="info"
              value={
                <>
                  {employeeTotal}{' '}
                  <span className="fs-6 fw-normal">
                    {/* Add percentage or other data if necessary */}
                  </span>
                </>
              }
              title="Employee"

              chart={
                <CChartLine
                  ref={widgetChartRef2}
                  className="mt-3 mx-3 tw-text-base-content"
                  style={{ height: '70px' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'My First dataset',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(130, 141, 133, 1)',
                        pointBackgroundColor: 'rgba(130, 141, 133, 1)',
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
          
          {/* <CCol sm={6} xl={4} xxl={3}>
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
          </CCol> */}
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



        <div className='tw-mt-5'>
        <Reports />
        </div>

      </div>

    </>

  )
}

export default Home
