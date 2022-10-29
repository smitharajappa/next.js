import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

type IProps = {
    seed?: string,
    large?: boolean
}

function Avatar({seed, large}: IProps) {
    const {data: session} = useSession();
  return (
    <div className={`relative overflow-hidden h-10 w-10 rounded-full bg-white border-gray-200 ${large && 'h-20 w-20' }`}>
        <Image className='absolute' src={`https://avatars.dicebear.com/api/open-peeps/${session?.user?.name || 'placeholder' || seed }.svg`} objectFit='contain' layout='fill' />
    </div>
  )
}

export default Avatar