import React, { useContext } from 'react'
import { Appcontext } from '../../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../Common.jsx/Icon'

const MyCourses = () => {

const {mainDataOfCourse,setMainDataOfCourse, setEditId,setEnroll,settoggle}=useContext(Appcontext)


const navigate=useNavigate();


function DeleteCourse (id){
let fildata=mainDataOfCourse.filter((data)=>{
  return data.id !==id
})
setMainDataOfCourse(fildata)

}

function EditCourse(elem){
  settoggle(false)
  navigate('/dashboard/CreateCourse')
  setEnroll((prev)=>{return {...prev,title:elem.title,about:elem.about,image:elem.image,video:elem.video}});
  setEditId(elem.id);
  
}

function CreateCourseHandle(){
  navigate('/dashboard/CreateCourse')
}


  return (
<>

    <div className='w-11/12 h-full  mx-auto flex  gap-x-[20px] flex-wrap gap-y-[10px] justify-center items-center'>
    
    {
      (mainDataOfCourse.length==0) ?(<div className='text-white text-3xl w-full h-full flex flex-col items-center justify-center '><p>No course available</p><IconBtn text="create course" onclick={CreateCourseHandle}/></div>):
    

      ( 
        
        mainDataOfCourse.map((obj)=>{
         return <div  className='  bg-pure-greys-900 hover:shadow-pure-greys-500  shadow-md  rounded-md w-[300px] h-[400px]  flex flex-col gap-y-[5px] items-center '>
         <div className='w-full h-[200px] rounded-md border border-b-white'>
    
    
 
        <img src={obj.image} className='object-cover w-full h-full aspect-auto' alt='not Available'/>
                </div>
                <div className='flex flex-col justify-center items-center'>
                 <p className='text-white text-2xl break-words w-full text-center '>{`${( obj.title).substring(0,20)}`}</p>
        <p className='text-white font-sarif overflow-y-auto break-words w-full '>{`${( obj.about).substring(0,30)}...`}</p>
  </div>
       <div className='flex flex-col w-full gap-y-3'>
       <button className=' w-[80%] mx-auto hover:opacity-70 rounded-md bg-red-100 opacity-60' onClick={()=>DeleteCourse(obj.id)}>Delete</button>
       <button className=' w-[80%] hover:bg-yellow-25 mx-auto rounded-md bg-yellow-200 ' onClick={()=>EditCourse(obj)}>EDIT</button></div>
       </div>
        })
       )
    }
  




    </div>
    </>
  )
}

export default MyCourses
