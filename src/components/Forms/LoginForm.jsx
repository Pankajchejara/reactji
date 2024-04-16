import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link,  useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast'
import { encrypt,decrypt } from 'n-krypta';

const LoginForm = ({setIsLoggedIn}) => {
    try{

        var secretKey='@@123'
    
    
        var SignUpArray= decrypt((JSON.parse(localStorage.getItem("signUpArray"))),secretKey)
    }catch{
        SignUpArray=[{ firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        dob:"",
        about:"",
        gender:""}]
    }
  



    const navigate = useNavigate();


    const [formData, setFormData] = useState( {
        email:"", password:""
    })

    const[showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }
   

    function submitHandler(event) {
        event.preventDefault();
        
        const searchKey1 = 'email';
const searchValue1 = formData.email
const searchKey2 = 'password';
const searchValue2 = formData.password

const foundObject = SignUpArray.find(obj => obj[searchKey1] === searchValue1 && obj[searchKey2] === searchValue2);

              const NewfoundObject=SignUpArray.find(obj => obj[searchKey1] === searchValue1 )
        
        
        if (foundObject) {
            const foundArray=SignUpArray.filter((data)=>{
                return  (data.email!==foundObject?.email);
            })
         
          let newFoundArray=  [...foundArray,foundObject]
          
           let encNewFoundArray=encrypt(newFoundArray,secretKey)
           
            localStorage.setItem("signUpArray",JSON.stringify(encNewFoundArray))
         
          setIsLoggedIn(true);
          navigate("/dashboard/profile");
          toast.success("Login Successful")
          
        } else if(NewfoundObject) {
            toast.error("Wrong Password Please type carefully")
        }
        else{
            toast.error("Please Signup First")
        }
    



       



        }

  return (
    <form onSubmit={submitHandler}
    className="flex flex-col w-full gap-y-4 mt-6">

        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type="email"
                value = {formData.email}
                onChange={changeHandler}
                placeholder="Enter email address"
                name="email"
                className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type= {showPassword ? ("text") : ("password")}
                value = {formData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
                className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />

            <span 
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? 

                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>

            <Link to="/forget">
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                    Forgot Password
                </p>
            </Link>
        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Sign In
        </button>

    </form>
  )
}

export default LoginForm
