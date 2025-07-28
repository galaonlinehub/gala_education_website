'use client'
import { Button, Result } from 'antd';
import {useRouter} from 'next/navigation';
import React from 'react';
 
export default function NotFound() {

  const router = useRouter();
  return (
    <main className='w-screen h-full flex items-center justify-center'>
      <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={()=>router.push('/')} type="primary">Back Home</Button>}
    />
    </main>
  )
}