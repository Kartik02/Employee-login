import axios from 'axios'
import React, { useEffect } from 'react'

const Home = () => {
  // const [adminTotal,setAdminTotal] = useState()
  // const [employeeTotal,setEmployeeTotal] = useState()
  // const [salaryTotal,setSalaryTotal] = useState()
  // useEffect(()=>{
  //   adminCount();

  // },[])
  // const adminCount = ()=>{
  //   axios.get('http://localhost:3000/auth/admin_count')
  //   .then(result=>{
  //     if(result.data.status){
  //       setAdminTotal(result.data.Result[0].admin)
  //     }
  //   })
  // }
  return (
    <div >
    <div className="p-3 d-flex justify-content-around mt-3">
      <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
        <div className="text-center pb-1">
          <h4>Admin</h4>
        </div>
        <hr/>
        <div className="">
          <h5>Total:</h5>
        </div>
      </div>
      <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
        <div className="text-center pb-1">
          <h4>Employee</h4>
        </div>
        <hr/>
        <div className="">
          <h5>Total:</h5>
        </div>
      </div>
      <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
        <div className="text-center pb-1">
          <h4>Salary</h4>
        </div>
        <hr/>
        <div className="">
          <h5>Total:</h5>
        </div>
      </div>
    </div>
    <div className="mt-4 px-5 pt-3">
      <h3>LIST OF ADMIN</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  <button className="btn btn-info btn-sm me-2 mt-8">Edit</button>
  <button className="btn btn-warning btn-sm mt-8 ">delete</button>
        </tbody>

      </table>
    </div>
    
      
    </div>
  )
}

export default Home
