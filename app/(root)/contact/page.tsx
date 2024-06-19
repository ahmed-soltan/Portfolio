import React from 'react'
import ContactForm from './_components/ContactForm'
import { currentUser } from '@clerk/nextjs/server'

const page = async() => {

  const user = await currentUser()
  let signedIn = false
  if(user){
    signedIn=true
  }

  return (
    <div className='px-2 lg:px-10 w-full flex flex-col items-center justify-center mt-10 gap-5'>

      <h1 className='text-center text-3xl font-medium'>Contact me</h1>
      <ContactForm signedIn={signedIn}/>
    </div>
  )
}

export default page