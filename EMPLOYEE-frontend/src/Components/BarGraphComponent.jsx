import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar} from '@coreui/react-chartjs'


const Charts = () => {
  const dummyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39], // Dummy data
      },
    ],
  };

  return (
    <CRow>
   
      <CCol>
        <CCard className="my-4">
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody className='w-100'>
            <CChartBar className='w-100'
              data={dummyData}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
  
    </CRow>
  )
}

export default Charts
//done