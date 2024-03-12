import React from 'react'
 import Sidebar from './Sidebar'
 import {Links} from '../../data/Links'
 import { encrypt,decrypt } from 'n-krypta'
 
const MainSection = () => {
const secretKey='@@123'
try{

  var signupArray=decrypt(JSON.parse((localStorage.getItem("signUpArray"))),secretKey)
  var ACCOUNT_TYPE=signupArray[signupArray.length-1]?.accountType
 
}
catch{
  var ACCOUNT_TYPE={
    "accountType":"student"
  } 
}
  return (
    <div className=" text-white hidden lg:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-900 bg-pure-greys-900 py-10 gap-y-[20px]">
      {
        Links.map((link,index)=>(
          
            
              (link.type==ACCOUNT_TYPE||link.name=="My Profile"||link.name=="Setting")&&( <Sidebar key={index} link={link}/>)
            
          
          
           
        ))
      }
    </div>
  )
}

export default MainSection
