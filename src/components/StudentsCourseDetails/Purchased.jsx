import React ,{useContext, useState}from 'react'
import { Appcontext } from '../../context/Appcontext'
import toast from 'react-hot-toast'
import { encrypt,decrypt } from 'n-krypta'


const Purchased = () => {
var secretKey='@@123'
  const {buycourse,setBuyCourse}=useContext(Appcontext)
  
  const [isPlaying, setIsPlaying] = useState(false);


  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
const [show,setShow]=useState('');
let encbuycourse=encrypt(buycourse,secretKey)
  localStorage.setItem("buycoursedata",JSON.stringify( (encbuycourse)))


function delhandle(id){
const filterdata=buycourse.filter((data)=>{
  return data.id!==id
})
toast.success("Deleted Successfully")
setBuyCourse(filterdata)
}


function viewhandle(obj){
setShow(obj.id)
}
function clickhandlerdelete(){
  setShow(false)
}

  return (


<div className=' w-full relative'>
      
      

    
   {!(buycourse.length===0)?(   <div className='w-full flex-wrap  h-full mx-auto flex  gap-x-[20px] justify-center items-center  gap-y-[10px]'>
    {
      buycourse.map((obj)=>{
        
          return <div key={obj.id}>
          
          <div  className='  bg-pure-greys-900 hover:shadow-pure-greys-500  shadow-md  rounded-md w-[300px] h-[400px]  flex flex-col gap-y-[5px] items-center '>
          <div className='w-full h-[200px] rounded-md border border-b-white'>
     
     
  
         <img src={obj.image} className='object-cover w-full h-full aspect-auto' alt='Not Available '/>
                 </div>
  <div className='flex flex-col justify-center items-center'>
                 <p className='text-white text-2xl break-words w-full '>{`${( obj.title).substring(0,20)}`}</p>
        <p className='text-white font-sarif overflow-y-auto break-words w-full '>{`${( obj.about).substring(0,30)}...`}</p>
  </div>
        <button className='text-white w-[80%] mx-auto  rounded-md bg-blue-100  ' onClick={()=>delhandle(obj.id)}>delete</button>
       <button className= 'text-blue-400  w-[80%] mx-auto  rounded-md bg-yellow-100 ' onClick={()=>viewhandle(obj)}>viewDetails </button>
        </div>
  
     {show===(obj.id)&&   <div className=' bg-pure-greys-900 fixed top-[0px] left-0 right-0  shadow-md border border-pure-greys-500  rounded-md w-full h-full hover:shadow-pure-greys-500 flex flex-col gap-y-[5px] justify-center items-center '>
         
         <div className='w-full h-full relative'>
         <video
        //  key={obj.videourl}
       
        controls
        autoPlay={isPlaying}
        onClick={togglePlay}
        style={{ cursor: 'pointer' }} className='object-fill w-full h-full'
      >
        <source src={obj.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video></div>
      <p className='text-white absolute bottom-10'>{obj.title}</p>
           <button className= 'text-blue-400 absolute top-[100px] right-0 bg-yellow-100 p-2 rounded-xl' onClick={clickhandlerdelete}>Close</button>
   </div>
      }
   </div>
         })
  } 
      
      
  
  
  
      </div>):(<p className='text-white text-center text-3xl'>No purchased course Available here</p>)
} 
      </div>
  )
}

export default Purchased
