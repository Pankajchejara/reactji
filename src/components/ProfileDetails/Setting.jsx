import React, {  useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconBtn from '../../Common.jsx/Icon'
import { decrypt, encrypt } from 'n-krypta'
const Setting = () => {

  let navigate = useNavigate()
var secretKey="@@123"

    let obj=decrypt((JSON.parse ( localStorage.getItem("signUpData"))),secretKey)


  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)




  const [SignUpdataobject, SetSignUpDataObject] = useState(obj)

  const [Password, setPassword] = useState({
    oldPassword: "", newPassword: ""
  })


  function changehandler(e) {


    SetSignUpDataObject((prev) => {
      return { ...prev, [e.target.name]: e.target.value, }
    })



  }


  function clickhandler(e) {
    e.preventDefault()
    try{

    
    if(Password.oldPassword===SignUpdataobject.password){
 
  let encryptData=encrypt({...SignUpdataobject,password:Password.newPassword,confirmPassword:Password.newPassword},secretKey)
      localStorage.setItem("signUpData",JSON.stringify(encryptData))
      
    }
    else{
 
  let encryptData=encrypt(SignUpdataobject,secretKey)
      localStorage.setItem("signUpData",(JSON.stringify(encryptData)));
      
    }
  }catch{
    localStorage.setItem("signUpData",obj)
  }
    


    navigate('/dashboard/profile')



  }
 


  function changehandlerpass(e) {
    setPassword((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    }
    )


  }





  return (
    <>
      <form >
        
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-pure-greys-700 bg-pure-greys-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style text-white ">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style bg-pure-greys-700 text-white opacity-70"
                value={SignUpdataobject.firstName}
                onChange={changehandler}
              />


            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style text-white">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style bg-pure-greys-700 text-white opacity-70"
                value={SignUpdataobject.lastName}
                onChange={changehandler}
              />

            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style text-white">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dateOfBirth"
                className="form-style bg-pure-greys-700 text-white opacity-70"
                onChange={changehandler}

              />

            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style text-white">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style bg-pure-greys-700 text-white opacity-70"
                onChange={changehandler}
                value={SignUpdataobject.gender}
              >
                <option>Male</option>
                <option>feMale</option>
              </select>

            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style text-white">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style bg-pure-greys-700 text-white"
                onChange={changehandler}

              />

            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style text-white">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style bg-pure-greys-700 text-white"
                onChange={changehandler}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>

          <button
            onClick={clickhandler}
            className="cursor-pointer rounded-md bg-blue-700 py-2 px-5 font-semibold text-richblack-50"
          >
            save
          </button>

        </div>
      </form>

      <form onSubmit={clickhandler}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-pure-greys-700 bg-pure-greys-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style text-white">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style bg-pure-greys-700 text-white"
                onChange={changehandlerpass}
                value={Password.oldPassword}
               
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[33px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>


            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style text-white">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style bg-pure-greys-700 text-white"
                onChange={changehandlerpass}
                value={Password.newPassword}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[33px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  )
}
export default Setting;