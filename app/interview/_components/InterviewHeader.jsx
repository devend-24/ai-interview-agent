import React from 'react'
import Image from 'next/image'

function InterviewHeader() {
  return (
    <div className='p-1 shadow-sm'>
      <Image src='/mainlogo.png' alt='logo'
      width={130}
      height={100}
      className='w-[150px] h-[100px]'
      />
    </div>
  )
}

export default InterviewHeader
