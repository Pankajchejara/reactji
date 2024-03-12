import React, { createContext, useState } from 'react'
import { encrypt,decrypt } from 'n-krypta';
export const Appcontext=createContext();
let secretKey='@@123'


function getlocalitems (){
try{


  let list=(localStorage.getItem('Enroll'))
  
  
  if(list){
    let getEnroll= decrypt(JSON.parse(localStorage.getItem('Enroll')),secretKey)
  
    return getEnroll;

  }
  else{
    
    return []
  }
}catch{
  return []
}
  }

function getlocalitemsSignUp (){
  try{

    let list=(localStorage.getItem("signUpArray"))
  
    
  if(list){
    let SignUpObject=decrypt(JSON.parse(localStorage.getItem("signUpArray")),secretKey)
    
  
    return SignUpObject;

  }
  else{
    
    return []
  }
  }catch{
    return []
  }
  
 
  }

function getlocalitemslocal (){
  try{

    let list=( localStorage.getItem('buycoursedata'))
    
    
    if(list){
      
      return decrypt(JSON.parse( localStorage.getItem('buycoursedata')),secretKey)
    }
      else{
      return []
    }
  }catch{
    return []
  }
 
  }

      
  

export default function Appcontextprovider ({children}) {

 




    const[data,setData]=useState('');
    const[signupArray,setSignUpArray]=useState(getlocalitemsSignUp());
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
        setImg,signupArray,setSignUpArray,
       
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


