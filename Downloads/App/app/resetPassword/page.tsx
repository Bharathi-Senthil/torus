import React from 'react'
import Image from 'next/image'
import Dashboard from '../assets/unfinished.webp'

const Page = () => {
  
  return (
    <>
      <Image
        src={Dashboard}
        layout='fill'
        alt='Website Under Construction'
      ></Image>
    </>
  )
}

export default Page



//import React from 'react'
//import ForgotPassword from '../components/forgotPassword'

//const Page = () => {
//  return <ForgotPassword />
//}

//export default Page
