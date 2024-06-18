import React from 'react'

const ProfileTitle = ({title}:{title:string}) => {
  return (
        <h1 className='text-slate-800 dark:text-slate-300 text-3xl font-medium'>{title}</h1>
  )
}

export default ProfileTitle