import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='p-6 flex flex-col items-center justify-center gap-5 h-full'>
      <h1 className='italic text-slate-600 dark:text-slate-400'>Sorry, This Section is not Availbale Yet.</h1>
      <Link href={'/profile'}>
        <Button>Back To Home Page</Button>
      </Link>
    </div>
  )
}

export default page