// import React from 'react'
import React, {useEffect,useState} from 'react'
import axios from 'axios';

const AddEmployee = () => {
    const [employee,setEmployee] = useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        addres:'',
        category_id:'',
        image:''
    })
    const [category,setCategory] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result=>{
            if(result.data.Status){
                setCategory(result.data.Result)

            }else{
                alert(result.data.Error)
            }
            

        }).catch(err=> console.log(err))

    },[])
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_employee',employee)
        .then(result=>console.log(result.data))
        .catch(err=> console.log(err))
    }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3 ">
      <div className="p-3 rounded w-50 border ">
        <h2 className="text-center">Add Employee</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Name"
              onChange={(e)=> setEmployee({...employee,name:e.target.value})}
              />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e)=> setEmployee({...employee,email:e.target.value})}
              />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Pssword
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter password"
              onChange={(e)=> setEmployee({...employee,password:e.target.value})}
              
              />
                <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e)=> setEmployee({...employee,salary:e.target.value})}
              
              />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="address"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="b4 roopa flat-102"
              autoComplete="off"
              onChange={(e)=> setEmployee({...employee,address:e.target.value})}
              />
          </div>

           <div className="col-12">
          <label for="category" className="form-label">category</label>
          <select name="category" id="category" className="form-select">
          onChange={(e)=> setEmployee({...employee,category_id:e.target.value})}
            {category.map((c) =>{
                return <option value={c.id}>{c.name}</option>
            })}
          </select>
          </div>
         
          <div className="col-12 mb-3">
            <label for="inputGroupFile01" className="form-label">
              Select image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              onChange={(e)=> setEmployee({...employee,image:e.target.files[0]})}
              
              />
          </div>
    
         
          <div className="col-12">
          <button type="submit" className="btn btn-success w-100 ">
            Add Employee
          </button>

          </div>

         
        </form>
      </div>
    </div>
  )
}

export default AddEmployee;
