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
//import RegisterForm from '../components/register'

//const Page = () => {
//  return <RegisterForm />
//}

//export default Page