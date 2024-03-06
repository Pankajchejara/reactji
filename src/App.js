import "./App.css";
import { useState } from "react";
import Navbar from "./Common.jsx/NavbarDetails/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {Routes, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home";
import MyCourses from "./components/InstructorCourseDetail/MyCourses";
import PrivateRoute from "./components/PrivateRoute";
import Dictionary from './Common.jsx/NavbarDetails/Dictionary'
import Cardgame from "./Common.jsx/NavbarDetails/Cardgame";
import Courses from "./components/StudentsCourseDetails/Courses";
import Purchased from "./components/StudentsCourseDetails/Purchased";
import Setting from "./components/ProfileDetails/Setting";
import MyProfile from "./components/ProfileDetails/MyProfile";
import CreateCourse from "./components/InstructorCourseDetail/CreateCourse";
import ContactForm from "./Common.jsx/NavbarDetails/ContactForm";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);




  return (
   <div className="w-full relative min-h-screen bg-pure-greys-900 flex flex-col font-inter " >

<Routes>
  <Route path='/Dictionary' element={<Dictionary/>} />
  <Route path='/Cardgame' element={<Cardgame/>} />
  <Route path='/ContactUs' element={<ContactForm/>} />
<Route path="/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard/>
          </PrivateRoute>
       
        } />


<Route path="/dashboard" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard/>
          </PrivateRoute>
       
        } >


<Route path="/dashboard/profile" element={<MyProfile />}/> 
<Route path="/dashboard/CreateCourse" element={<CreateCourse/>}/> 
<Route path="/dashboard/mycourses" element={<MyCourses/>}/> 
<Route path="/dashboard/courses" element={<Courses/>}/> 
<Route path="/dashboard/purchased" element={<Purchased/>}/> 
<Route path="/dashboard/setting" element={<Setting/>}/> 

 </Route>



<Route path="/Games" element={<Cardgame />}/>


<Route path="/Newrepo" element={<Home />}/>



</Routes>
<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>



   </div>
  );
}

export default App;
