import React, { useEffect} from 'react'
import { RiEditBoxLine } from "react-icons/ri"
import IconBtn from '../../Common.jsx/Icon';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css'
import {  } from 'n-krypta';

const MyProfile = () => {
  let secretKey='key'
  useEffect(()=>{
    AOS.init({duration :1000})
  },[])
  

  

  const navigate=useNavigate();
  let obj=JSON.parse (( localStorage.getItem("signUpData")))

return (
  <div data-aos="fade-up">
    <h1 className="mb-14 text-3xl font-medium text-richblack-5 ">
      My Profile
    </h1>
    <div className="flex profileBoxDirection gap-y-6 justify-between items-center rounded-md border-[1px] border-richblack-700 bg-pure-greys-800  p-8 px-12">
     
      <div className="flex sm:flex-row flex-col items-center gap-x-4 gap-y-4">
        <img
          src={`https://api.dicebear.com/5.x/initials/svg?seed=${obj.firstName}`}
          alt="not Available"
          className="aspect-square w-[6em] rounded-full object-cover max-w-[100%]"
        />
        <div className="space-y-1 ">
          <p className="text-xl  text-white">{obj.firstName}</p>
          <p className=" text-center h-auto text-sm text-richblack-300">{obj.email}</p>
          
        </div>
      </div>

    <div>
    <IconBtn
          text="Edit"
          outline={true}
          onclick={() => {
            navigate("/dashboard/setting")
          }}
        >
          <RiEditBoxLine  className='text-yellow-5'/>
        </IconBtn>
        </div>

    </div>


<section>

    <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-pure-greys-700 bg-pure-greys-800  p-8 px-12">
      <div >

        <div>
      <p
        className={`${
        false
            ? "text-richblack-5"
            : "text-richblack-400"
        } text-sm font-medium`}
      >
         Write Something About Yourself
      </p>
      


        </div>


<div className='flex justify-between  profileBoxDirection'> 
 {/* yha se about wala */}

<div>  <p className="text-lg font-semibold text-richblack-5">{obj.about}</p></div>

<div>
       <IconBtn
       outline={true}
          text="Edit"
          onclick={() => {
            navigate("/dashboard/setting")
          }}
        >
          <RiEditBoxLine  className='text-yellow-5'/>
        </IconBtn>
        </div>

 </div>       
        
      </div>
     
    </div>

    </section>

<section>

    <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-pure-greys-700 bg-pure-greys-800  p-8 px-12">
      <div >
        <p className="text-lg  font-semibold text-richblack-5">
          Personal Details
        </p>
       
        
      </div>
      <div className=" flex flex-col  md:flex-col  lg:flex-row w-full items-center   lg:justify-between  gap-y-6">
        <div >

          <div className='flex flex-col gap-y-5 w-[300px]  '>
          <div>
            <p className="mb-2 text-sm text-richblack-600 text-center sm:text-left">First Name</p>
            <p className="text-sm  text-center font-medium text-richblack-5 sm:text-left">
            {obj.firstName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600 text-center sm:text-left">Email</p>
            <p className=" text-center text-sm font-medium text-richblack-5 sm:text-left">
              {obj.email}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600 text-center sm:text-left">Gender</p>
            <p className=" text-center text-sm font-medium text-richblack-5 sm:text-left">
               {obj.gender}
            </p>
          </div>
          </div> 
          </div>




        <div >

          <div className="flex flex-col gap-y-5  w-[300px]">
          <div>
            <p className="mb-2 text-sm text-richblack-600 text-center sm:text-left">Last Name</p>
            <p className="text-sm font-medium text-richblack-5 text-center sm:text-left">
          {obj.lastName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600 text-center sm:text-left ">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5 text-center sm:text-left">
            {obj.contact}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600 text-center sm:text-left">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5 text-center sm:text-left">
              {obj.dob}
            </p>
          </div>
          </div>
        </div>
 

 <div className='w-[300px] flex justify-center items-center sm:text-right'>
        <IconBtn
        outline={true}
          text="Edit"
          onclick={() => {
            navigate("/dashboard/setting")
          }}
        >
          <RiEditBoxLine  className='text-yellow-5'/>
        </IconBtn>

        </div>


      </div>
    </div>

    </section>





   





  </div>
)
}

export default MyProfile
