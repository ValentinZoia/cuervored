import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function ErrorCard() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-slate-200'>

        <Card className="flex  flex-col justify-center items-center w-[300px] border-t-red-500 border-t-8">
            <CardHeader className='text-center' >
                <h1 className='text-2xl text-red-500'>⚠</h1>
                <CardTitle className=" text-center">OOPS!</CardTitle>
                <CardDescription>Something went wrong!</CardDescription>

            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full">
                    <Link href={'/auth/login'}>Back to login</Link>
                </Button>
            </CardContent>
            
        </Card>

        
    </div>
  )
}
