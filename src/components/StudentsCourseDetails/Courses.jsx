import React ,{useContext,  useState}from 'react'
import { Appcontext } from '../../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Courses = () => {
    const {mainDataOfCourse,setBuyCourse,buycourse}=useContext(Appcontext)

const[show,setShow]=useState(false);
const navigate=useNavigate();

const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };





    function BuyCourseHandler(obj){
      
        
      let newobj=  {...obj,id:new Date().getTime().toString()}
      
      
      let buycoursedata=buycourse.find((data)=>{
        return data.title===obj.title &&data.about===obj.about&&data.image===obj.image&&data.video===obj.video
      })
      if(buycoursedata){
        toast.error("Course Already Purchased")
      }
      else{

        setBuyCourse((prev) => {
        const newArray = [...prev, newobj]
       
        return newArray
      });
      toast.success("Course Purchased")          
navigate('/dashboard/purchased')
      }
    
    }





 
    function clickhandlerdelete(){
       
        setShow(false)
    }
  return (
    
    <div className=' w-full relative'>
      
      

    
    <div className='w-full flex-wrap  h-full mx-auto flex  gap-x-[20px] justify-center items-center  gap-y-[10px]'>
  { !mainDataOfCourse.length==0&&(
    mainDataOfCourse.map((obj)=>{
      
        return <div key={obj.id}>
        
        <div  className=' overflow-auto  bg-pure-greys-900 hover:shadow-pure-greys-500  shadow-md  rounded-md w-[300px] h-[400px]  flex flex-col gap-y-[15px] items-center '>
        <div className='w-full h-[200px] rounded-md border border-b-white'>
   
   

       <img src={obj.image} className='object-cover w-full h-full aspect-auto' alt='not available'/>
               </div>
               <div className='flex flex-col justify-center items-center'>
                 <p className='text-white text-2xl break-words w-full '>{`${( obj.title).substring(0,20)}`}</p>
        <p className='text-white font-sarif overflow-y-auto break-words w-full '>{`${( obj.about).substring(0,30)}...`}</p>
  </div>
     <button className= 'text-blue-400  w-[80%] mx-auto  rounded-md bg-blue-100 ' onClick={()=>BuyCourseHandler(obj)}>buy course</button>
    
      </div>

   {show===(obj.id)&&   <div className=' bg-pure-greys-900 fixed top-[300px] left-[500px] shadow-md border border-pure-greys-500  rounded-md w-[400px] h-[300px] hover:shadow-pure-greys-500 flex flex-col gap-y-[5px] justify-center items-center '>
       <video
      //  key={obj.videourl}
      width="400"
      controls
      autoPlay={isPlaying}
      onClick={togglePlay}
      style={{ cursor: 'pointer' }}
    >
      <source src={obj.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <p className='text-white'>{obj.title}</p>
         <button className= 'text-blue-400' onClick={clickhandlerdelete}>delde </button>
 </div>
    }
 </div>
       }))
} 
   {
    mainDataOfCourse.length==0&&<p className='text-white text-3xl text-center'>No Course Available</p>
   }
    



    </div>

    </div>
  )
}

export default Courses
