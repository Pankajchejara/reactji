import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { encrypt,decrypt } from 'n-krypta';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const ForgetPassword = () => {
var secretKey='@@123'
  let navigate=useNavigate()
let array=decrypt(JSON.parse(localStorage.getItem('signUpArray')),secretKey)

const[password,setPassword]=useState('');
const[ConfirmPassword,setConfirmPassword]=useState('');
const[email,setEmail]=useState('');
const[show,setShow]=useState(false);
const[obj,setobj]=useState('');
const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

function changeHandler(e){
setPassword(e.target.value)
}
function changeConfirmHandler(e){
setConfirmPassword(e.target.value)
}
function changeEmailHandler(e){
  setEmail(e.target.value)
}




function clickhandler(e){
  var newArray=array.filter((data)=>{
   return data.email==email
  })
  

  if(newArray.length!=0){
    setShow(true);
    setobj(newArray[0])
    toast.success("Email Verified")
  }
  else{
toast.error("Email not Exist")
  }
}


function SubmitHandler(e){
  var FilteredArray=array.filter((data)=>{
    return data.email!=email
   })

   if(password===''&&ConfirmPassword===''){
    toast.error("please fill the password")
   }

  if((password!=''&&ConfirmPassword!='')&&(password==ConfirmPassword)){
      obj.password=password;
      obj.ConfirmPassword=password;
      FilteredArray.push(obj);
      let encFilteredArray=encrypt(FilteredArray,secretKey)
      localStorage.setItem("signUpArray",JSON.stringify(encFilteredArray))
      toast.success("Password Updated")
      navigate('/login')
  }
}


  return (<div className='bg-pure-greys-800 w-full h-[100vh] justify-center items-center flex'>
   {show?(<div className=' flex flex-col w-[280px]  sm:w-[330px] gap-y-4 mt-[20px]'>
                <label className='w-full '>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                  <div className='relative'>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={password}
                        className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5  w-full p-[12px]  '
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
                        onChange={changeConfirmHandler}
                        placeholder="Confirm Password"
                        value={ConfirmPassword}
                        className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
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

                <button className='text-center  bg-yellow-100 py-1 rounded-md cursor-pointer hover:bg-yellow-50 transition-all duration-300 'text='next' onClick={SubmitHandler}>Sumbit</button>
            </div>


    
    
    
    
    
    
    ):(<div className='flex flex-col gap-y-6   w-[280px] sm:w-[320px]'>
      <label className='w-full gap-y-1'>
        <p className='s text-white'>Email <sup className='text-red-100 ' >*</sup></p>
    <input type='email' placeholder='Type your email' value={email} className='text-white rounded-md w-full bg-pure-greys-600  p-[12px]'onChange={changeEmailHandler}/>
    </label>
    <button className='text-center  bg-yellow-100 py-1 rounded-md cursor-pointer hover:bg-yellow-50 transition-all duration-300 'text='next' onClick={clickhandler}>Next</button>
    
    </div>)
   } 

    </div>
  )
}

export default ForgetPassword
