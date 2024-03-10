import React, { createContext, useState } from 'react'

export const Appcontext=createContext();



function getlocalitems (){
  let list=localStorage.getItem('Enroll')
  
  
  if(list){
    let getEnroll= JSON.parse( localStorage.getItem('Enroll'))
  
    return getEnroll;

  }
  else{
    
    return []
  }
 
  }

function getlocalitemslocal (){
  let list=( localStorage.getItem('buycoursedata'))
  
  
  if(list){
    
    return JSON.parse(( localStorage.getItem('buycoursedata')))
  }
    else{
    return []
  }
 
  }

      
  

export default function Appcontextprovider ({children}) {

 




    const[data,setData]=useState('');
    const[signupdata,setSignUpData]=useState([]);
    const[buycourse,setBuyCourse]=useState(getlocalitemslocal());

    const[editId,setEditId]=useState([]);
    const[mainDataOfCourse,setMainDataOfCourse]=useState(getlocalitems());
    const [img,setImg]=useState(null);
    const[toggle,settoggle]=useState(true)
 
    const[enroll,setEnroll]=useState({
         title:"",about:"",image:"",id:""
       })
   

    const value={
        data,
        setData,
        img,
        setImg,signupdata,setSignUpData,
       
        enroll,setEnroll,mainDataOfCourse,setMainDataOfCourse,editId,setEditId,toggle,settoggle,buycourse,setBuyCourse
    }
    
  
  return (
    <div>
      <Appcontext.Provider value={value}>
        {children}
      </Appcontext.Provider>
    </div>
  )
}


