import React, { useContext, useEffect, useState } from 'react'
import { Appcontext } from '../../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from '../Spinner'
import { FaCloudUploadAlt } from "react-icons/fa";
import IconBtn from '../../Common.jsx/Icon'
import toast from 'react-hot-toast'

const CreateCourse = () => {
 
  function selectFileVideoHandler(){
    document.querySelector(".videoinput_field").click();
  }
  
const[videoShow,setVideoShow]=useState(true)
const [isPlaying, setIsPlaying] = useState(false);
const [progress, setProgress] = useState(0);
  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
  const[image,setImage]=useState('')
  const[video,setVideo]=useState('')
 
  const[imageurl,setImageUrl]=useState('')
  const[videourl,setvideoUrl]=useState('')
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const { setEnroll,enroll, mainDataOfCourse, setMainDataOfCourse, editId,toggle,settoggle } = useContext(Appcontext)

  const ids = new Date().getTime().toString()

  function changeHandler(e) {

 

    const { name, value, files } = e.target;

    setEnroll((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    setImage(()=>({

    
      
      [name]: files ? files[0] : value,})
    );
  };



  useEffect(() => {
   
   
    localStorage.setItem("Enroll", JSON.stringify( (mainDataOfCourse)))
    AOS.init({ duration: 1000 })
  }, [mainDataOfCourse]);

 


  // submit data 

  function submithandle(e){
    e.preventDefault()
    
    if(!enroll){
  alert("please")
    }

    else if (!toggle){
      if(isImageUrl(enroll.image)){
        setMainDataOfCourse(
          mainDataOfCourse.map((elem)=>{
            if(elem.id===editId){
              return {...elem,title:enroll.title,about:enroll.about,image:enroll.image,video:videourl}
            }
            return elem
          })
         )
      }
      else{
        setMainDataOfCourse(
          mainDataOfCourse.map((elem)=>{
            if(elem.id===editId){
              return {...elem,title:enroll.title,about:enroll.about,image:imageurl,video:videourl}
            }
            return elem
          })
         )

      }
  
  
   setEnroll("")
   settoggle(true)
   navigate('/dashboard/mycourses')
    }
  
    else{
      
      setEnroll((prev)=>({...prev,id:ids,video:videourl}))

       setMainDataOfCourse((prev)=>(
    
        [...prev,{...enroll,id:ids,image:imageurl,video:videourl}])
    
    
        )
        

          toast.success("Course Added Successfully")
        
        navigate('/dashboard/mycourses')
        setEnroll('')
    
  }
  }
  
 

//  fetch image 

  async function  UploadImage(){
    try{
      setLoading(true)
      let data = new FormData()
  data.append("file",image.image)
  data.append("upload_preset","pankaj")
  data.append("cloud_name","dqr1ihw8d")
// start 
const xhr = new XMLHttpRequest();

  xhr.open(
    'POST',
    `https://api.cloudinary.com/v1_1/dqr1ihw8d/image/upload`,
    true
  );

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percentCompleted = Math.round(
        (event.loaded * 100) / event.total
      );
      setProgress(percentCompleted);
    }
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if(isImageUrl(data.secure_url)){
                setImageUrl(data.secure_url)
                setLoading(false)
                toast.success("Image uploaded")
               setProgress(0)
         }
        
        else{
                setLoading(false)
                toast.error("please select other file or image")
                setProgress(0)
              }
              
      } else {
          setLoading(false)
        toast.error(" Error ! please select image again")
        setProgress(0)
      }
      
    }
  };
xhr.send(data);
    }
    catch(err){
      setLoading(false)
     toast.error(" Error ! please select image again")
     setProgress(0)
    }
  }
    








    
   
  // fetch video 
 
    const UploadVideo = async () => {
      try {
        if (!video) {
          toast.alert('Please select a video file.');
          return;
        }
         setLoading(true)
        const formData = new FormData();
        formData.append('file', video);
        formData.append('upload_preset', 'pankaj');

        const xhr = new XMLHttpRequest();

        xhr.open(
          'POST',
          `https://api.cloudinary.com/v1_1/dqr1ihw8d/video/upload`,
          true
        );
      
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentCompleted = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress(percentCompleted);
          }
        };
      
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              if(IsVideoUrl(data.secure_url)){
                setvideoUrl(data.secure_url)
                setVideoShow(true)
  setEnroll((prev)=>{
    return{...prev,video:data.secure_url}
  })
    
                     
                      setLoading(false)
                      toast.success("Video uploaded")
                     setProgress(0)
                }
              
              else{
                      setLoading(false)
                      toast.error("please select other file or video")
                      setProgress(0)
                    }
                    
            } else {
               setLoading(false)
              toast.error(" Error ! please select video again")
              setProgress(0)
            }
            
          }
        };
      xhr.send(formData);
          }
          catch(err){
            setLoading(false)
           toast.error(" Error ! please select video again")
           setProgress(0)
          }
        }



  
function submitImagehandle(e){
e.preventDefault()
    
UploadImage();
 }




  function isImageUrl(url) {
    if(typeof(url)=='string'){

      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; 
    
      const extension = url.split('.').pop().toLowerCase();
     
      return imageExtensions.includes(extension);
    }
    else{
      return 0;
    }
  }



  function IsVideoUrl(url) {
    if(typeof(url)=='string'){

      const videoExtensions = ['mp4']; 
    
      const extension = url.split('.').pop().toLowerCase();
      
      return videoExtensions.includes(extension);
    }
    else{
      return 0;
    }
  }



  function changeHandlervideo(e){

setVideo(e.target.files[0])
setVideoShow(false)
  }
function subvideohandle(e){
e.preventDefault();
UploadVideo()
  
}
  

  return (
    <>
  { !loading&& <div className='border w-11/12 mx-auto rounded-xl bg-pure-greys-900' data-aos="fade-up">
      <div className='w-11/12 mx-auto py-5'>
        <div className='py-[20px] text-center'>
          <h2 className='text-white text-center font-bold text-3xl'>Create course</h2>
          <p className='text-red-100  text-center font-bold text-md'><sup>*</sup> Image size should be less than Upto 20Mb</p>
          <p className='text-red-100  text-center font-bold text-md'> <sup>*</sup>video size should be less than Upto 100 mb</p>
        </div>

        
        <form className='gap-y-5' >


<div className='gap-y-[20px] flex flex-col'>
  
{/* imagesection */}


<div className='flex bg-pure-greys-700 justify-between gap-y-3  gap-x-4 enrollbox border-b-white'>


        <div className=' w-full h-full  relative'onClick={()=>document.querySelector(".input_field").click()}>

 {
  toggle?(enroll.image?(<img src={URL.createObjectURL(enroll.image)} alt="Not Available" className=' w-full rounded-md h-full object-fill' />): (<div className='w-full h-full flex justify-center items-center text-white text-[100px] bg-pure-greys-600'><FaCloudUploadAlt /></div>)
  ):
  (enroll.image?(isImageUrl(enroll.image)?(<img src={enroll.image} alt='No available' className=' w-full rounded-md h-full object-fill' />):(<img src={URL.createObjectURL(enroll.image)} alt="not Available" className=' w-full h-full aspect-square object-fill' />))
   : (<div className='w-full h-full flex justify-center items-center text-white text-[100px] bg-pure-greys-600'><FaCloudUploadAlt /></div>))
 }
 
 <input type='file' name='image' accept="image/*" className='text-white  input_field  absolute top-9 hidden' onChange={changeHandler}  />
      
          </div>

          
<div className='flex items-center justify-center mr-7'>
          <IconBtn onclick={submitImagehandle} outline={true} >UploadImage</IconBtn>
</div>
 </div>
          
   {/* imagesectionend        */}
  

{/* videosection  start*/}
<div className='  flex bg-pure-greys-700  justify-between enrollbox gap-y-3 gap-x-5 border-b-white'>
          
  <div className='w-full  h-full ' onClick={selectFileVideoHandler}>

{((videoShow || video) && (
  <video
    key={video ? URL.createObjectURL(video) : enroll.video}
    className='object-fill'
    controls width="100%" height="auto"
    autoPlay={isPlaying}
    onClick={togglePlay}
    style={{ cursor: 'pointer' }}
  >
    <source src={video ? URL.createObjectURL(video) : enroll.video} type="video/mp4" />
    
  </video>
))}



     <input type='file' name='video' accept="video/*" className='text-white block lg:hidden videoinput_field ' onChange={changeHandlervideo}  />

  </div>

  

 
<div className='flex items-center justify-center mr-7'>
<IconBtn onclick={subvideohandle} outline={true} >UploadVideo</IconBtn>

</div>
</div>          
    {/* videosection end        */}
           
        
        
        
        
        
         <div>
            <label htmlFor='title' className='text-white'>Title:</label>
            <br />
            <input value={enroll.title} onChange={changeHandler} type='text' name='title' id='tie' className='bg-pure-greys-700 text-white w-full py-[12px] rounded-xl border-b border-richblack-600 ' />
          </div>
          

        
          <div>
            <label htmlFor='about' className='text-white '>About Course:</label>
            <br />
            <textarea value={enroll.about} onChange={changeHandler} id='tie' name='about' className='bg-pure-greys-700 w-full py-[12px] rounded-xl border-b-richblack-600  text-white cursor-text' required={true} />
          </div>


<div>
       {
        toggle?( <IconBtn  outline={true} className='text-white' text="Submit" onclick={submithandle} type='submit'/>):(<IconBtn className='text-white' color="yellow" text="Edit Course" onclick={submithandle} type='submit'/>
        )
       }  
 </div>     

 </div>    
        </form>

       


      </div>
    </div>}
 { loading&& <div className='w-11/12 h-[500px] flex justify-center items-center'>
 <p className='text-white'> Uploading ... <span className='text-blue-100'>{progress} %</span>  </p>
<Spinner/>
   </div>}
   </>
  )
}

export default CreateCourse
