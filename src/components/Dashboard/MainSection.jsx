import React from 'react'
 import Sidebar from './Sidebar'
 import {Links} from '../../data/Links'
 
const MainSection = () => {

let ACCOUNT_TYPE=(JSON.parse((localStorage.getItem("signUpData"))));
  return (
    <div className=" text-white hidden lg:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-900 bg-pure-greys-900 py-10 gap-y-[20px]">
      {
        Links.map((link)=>(
          
            
              (link.type==ACCOUNT_TYPE.accountType||link.name=="My Profile"||link.name=="Setting")&&( <Sidebar  link={link}/>)
            
          
          
           
        ))
      }
    </div>
  )
}

export default MainSection
