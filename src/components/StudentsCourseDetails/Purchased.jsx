import React ,{useContext, useState}from 'react'
import { Appcontext } from '../../context/Appcontext'
import toast from 'react-hot-toast'

const Purchased = () => {
  
  const {buycourse,setBuyCourse}=useContext(Appcontext)
  let secretKey='key'
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
const [show,setShow]=useState('');

  localStorage.setItem("buycoursedata",JSON.stringify( (buycourse)))


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
      
      

    
      <div className='w-full flex-wrap  h-full mx-auto flex  gap-x-[20px] justify-center items-center  gap-y-[10px]'>
    {
      buycourse.map((obj)=>{
        
          return <div key={obj.id}>
          
          <div  className='  bg-pure-greys-900 hover:shadow-pure-greys-500  shadow-md  rounded-md w-[300px] h-[400px]  flex flex-col gap-y-[5px] items-center '>
          <div className='w-full h-[200px] rounded-md border border-b-white'>
     
     
  
         <img src={obj.image} className='object-cover w-full h-full aspect-auto' alt='Not Available '/>
                 </div>
  
                 <p className='text-white text-2xl'>{obj.title}</p>
        <p className='text-white font-sarif'> {obj.about}</p>
  
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
      
      
  
  
  
      </div>
     
      </div>
  )
}

export default Purchased
