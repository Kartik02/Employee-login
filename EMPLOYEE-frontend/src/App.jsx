import React from "react";
// import './App.css'
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
//  import Category from './Components/Category'
import Profile from "./Components/Profile";
import TimeTracker from "./Components/TimeTracker";
import CalendarComponent from "./Components/CalenderComponent";
import Leave from "./Components/Leave";
import Employeesec from "./Components/Employeesec";
import Timesheet from "./Components/Timesheet";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import AdminDashboard from "./Components/AdminDashboard";
import AdminLogin from "./Components/AdminLogin";
import Reports from "./Components/Reports";
import EmployeeList from "./Components/EmployeeList";
import ProjectManagement from "./Components/ProjectManagement";
import AddProject from "./Components/AddProject";
import Tag from "./Components/Tag";
import CreateMeeting from "./Components/CreateMeeting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route
            path="/admindashboard/employee" 
            element={<Employee />}
          ></Route>
          <Route
            path="/admindashboard/employeelist"
            element={<EmployeeList />}
          ></Route>
          <Route
            path="/admindashboard/add_employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/admindashboard/addproject"
            element={<AddProject />}
          ></Route>
          <Route
            path="/admindashboard/tag"
            element={<Tag/>}
          ></Route>
          <Route path="/admindashboard/CreateMeeting" element={<CreateMeeting />}></Route>
        </Route>
        <Route path="/adminlogin" element={<AdminLogin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          {/* <Route path='/dashboard/category' element={<Category/>}></Route>  */}
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route
            path="/dashboard/employeesec"
            element={<Employeesec />}
          ></Route>
          <Route
            path="/dashboard/timetracker"
            element={<TimeTracker />}
          ></Route>
          <Route
            path="/dashboard/calender"
            element={<CalendarComponent />}
          ></Route>
          <Route
            path="/dashboard/projectmanagement"
            element={<ProjectManagement />}
          ></Route>
          <Route path="/dashboard/leave" element={<Leave />}></Route>
          <Route path="/dashboard/timesheet" element={<Timesheet />}></Route>
          <Route
            path="/dashboard/add_category"
            element={<AddCategory />}
          ></Route>
          <Route path="/dashboard/reports" element={<Reports />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
