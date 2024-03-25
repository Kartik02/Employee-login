import React,{useState} from 'react'
import './Style.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [values,setValues] = useState({
        empid:'',
        password:''
    })
    const [error,setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event)=>{
        event.preventDefault()
        axios.post('http://localhost:5173/auth/login', values)
        .then(result => {
            console.log('Response data:', result.data);
            if(result.data.loginStatus){
            console.log('Redirecting...')
            navigate('/dashboard')
            }else{
                setError(result.data.Error)
            }

        })
        .catch(err => console.log(err))

    }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
    <div className="p-3 rounded w-65 border loginForm">
    <div className="text-warning">
        {error && error}
    </div>
        <h2>Login page</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="empid"><strong>Employee ID:</strong></label>
                <input type="text" name="empid" autoComplete='off' placeholder="Enter Employee ID"
               onChange={(e) => setValues({...values,empid : e.target.value})} className="form-control rounded 0"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password"><strong>Password:</strong></label>
                <input type="password" name="password" placeholder="Enter Password"
                onChange={(e) => setValues({...values,password : e.target.value})} className="form-control rounded 0"/>
            </div>
            <button className="btn btn-success w-100 rounded 0">log in</button>
            {/* <div className="mb-3">
                <input type="checkbox" name="tick" id="tick"
                <label htmlFor="password"><strong>Term & Condition</strong></label>
                
               
            </div> */}
        </form>
    </div>
      
    </div>
  )
}

export default Login
