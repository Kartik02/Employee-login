

import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'


const Charts = () => {

  const dummyData = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10], // Dummy data
      },
    ],
  };


  return (
    <CRow>
      <CCol>
        <CCard className="my-4">
          <CCardHeader>Doughnut Chart</CCardHeader>
          <CCardBody className='w-100'>
            <CChartDoughnut className='w-50'
              data={dummyData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts

//done