import React from 'react'
import PieChartComponent from './PieChartComponent'
import BarGraphComponent from './BarGraphComponent'

const Reports = ({ pieChartData, barChartData }) => {
  
  return (
    
    <div className='tw-flex tw-justify-center'>
    <div className="tw-flex tw-flex-col tw-items-center tw-p-4">
      <div>
        <h2 className="tw-font-bold tw-mb-4">Pie Chart</h2>
        <PieChartComponent data={pieChartData} />
      </div>
      <div>
        <h2 className="tw-font-bold tw-mb-4">Bar Graph</h2>
        <BarGraphComponent data={barChartData} />
      </div>
    </div>
    </div>
  )
}

export default Reports