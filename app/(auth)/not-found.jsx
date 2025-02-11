'use client'
import React from 'react';
import { Button, Result } from 'antd';
import {useRouter} from 'next/navigation';
 
export default function NotFound() {

  const router = useRouter();
  return (
    <main className='w-screen flex items-center justify-center'>
      <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={()=>router.push('/')} type="primary">Back Home</Button>}
    />
    </main>
  )
}