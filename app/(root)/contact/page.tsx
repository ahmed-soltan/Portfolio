import React from 'react'
import ContactForm from './_components/ContactForm'

const page = () => {
  return (
    <div className='px-2 lg:px-10 w-full flex flex-col items-center justify-center mt-10'>
      <h1 className='text-center text-3xl font-medium'>Contact me</h1>
      <ContactForm/>
    </div>
  )
}

export default page