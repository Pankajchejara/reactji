import React, {useContext, useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Appcontext } from '../../context/Appcontext';
import { useNavigate } from 'react-router-dom';
import { encrypt,decrypt } from 'n-krypta';
import toast from 'react-hot-toast';
import { RxCross1 } from "react-icons/rx";

const SignupForm = ({setIsLoggedIn}) => {
const secretKey='@@123'
const {signupArray,setSignUpArray}=useContext(Appcontext)



    const navigate = useNavigate();
 
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        dob:"",
        about:"",
        gender:""
        
    })
    
    
   
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("student");


    
   
    
    
    function changeHandler(event) {
        
        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
            ) )
            
        }
        
        async function submitHandler(event) {
            event.preventDefault();
            if(formData.password !== formData.confirmPassword) {
                
                return ;
            }
            
            setIsLoggedIn(true);
            
            const accountData = {
                ...formData
            };
            
            const finalData = {
                ...accountData,
                accountType
            }
         
        
       const SignUpEmailCheck=(signupArray.filter((data)=>{
        return (data.email==finalData.email)
        
       }))
       
if(SignUpEmailCheck.length!=0){
    toast.error("email already exists Please Login")
}
else{

    signupArray.push(finalData);
         let encryptSignupArray=encrypt(signupArray,secretKey)
    
    localStorage.setItem("signUpArray",JSON.stringify(( encryptSignupArray)))

 //firebasedata




 //endfirebase data

  

   toast.success("SignUp Successful")
navigate("/dashboard/profile");


}

    }

    const[show,setShow]=useState(true)
    function closeBoxHandler(){
        setShow(false)
    }




    
      
      
  return (
    <div>
        {/* student-Instructor tab */}
        <div
        className='flex relative bg-pure-greys-700 p-1 gap-x-1 my-6 rounded-full max-w-max'>

            <button
            className={`${accountType === "student" 
            ?
              "bg-pure-greys-900 text-richblack-5"
            :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={()=> setAccountType("student")}>
                Student
            </button>

            <button
            className={`${accountType === "instructor" 
            ?
              "bg-pure-greys-900 text-richblack-5"
            :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType("instructor")}>
                Instructor
            </button>
            {
      show&&  <div className='absolute  -top-[120px] left-[100px] sm:-top-[100px] sm:left-[100px]  bg-white rounded-sm '><div className=' relative text-white w-[180px] h-[110px] sm:w-[200px] sm:h-[100px] md:w-[300px] md:h-[80px]   z-10 '>
        <p className=' md:text-2xl text-[16px] sm:text-center  font bold text-blue-800 font-bold  '> Want to Create course </p>
        <p className=' md:text-[16px] text-[10px]text-center text-blue-700 font-italic'>Please Select Instructor button here </p>
        <div className='absolute text-white w-[30px] h-[30px] rotate-45 -bottom-3  left-[6px] z-1 bg-white'></div>
        <button onClick={closeBoxHandler}><RxCross1  className='text-red-100 text-xl absolute top-0 right-0'/></button>
        </div>
    </div>
} 
        </div>

        <form onSubmit={submitHandler} >
        {/* first name and lastName */}
            <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  sm:placeholder:text-[16px] placeholder:text-[10px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  sm:placeholder:text-[16px] placeholder:text-[10px]'
                        />
                    </label>
            </div>
            {/* email Add */}
            <div className='mt-[20px]'>
            <label className='w-full mt-[20px]'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address "
                        value={formData.email}
                        className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  sm:placeholder:text-[16px] placeholder:text-[10px]'
                    />
            </label>
            </div>
            

            {/* createPassword and Confirm Password */}
            <div className='w-full flex flex-col md:flex-row  gap-y-4 gap-x-4 mt-[20px]'>
                <label className='w-full '>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                  <div className='relative'>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                        className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5  w-full p-[12px]  sm:placeholder:text-[16px] placeholder:text-[10px]'
                    />
                    <span
                     className='absolute right-3  top-[13px]  cursor-pointer' 
                    onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? 

                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                        (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                </span>
                </div>
                </label>
                

                <label className='w-full relative'>
                    
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                    <div className='relative'>
                    <input
                        required
                        type= {showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] sm:placeholder:text-[16px] placeholder:text-[10px]'
                    />
                    <span 
                     className='absolute right-3 top-[13px] cursor-pointer'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ?

                         (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                         (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                    </div>
                </label>
            </div>
        <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Create Account
        </button>
        </form>

       
    
    </div>
  )
}

export default SignupForm
