import React from 'react'

import Template from '../components/Forms/Template'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      
      text="Revolutionizing education, the digital interface offers tools, resources, and interactive content for an enhanced online learning experience."
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup
