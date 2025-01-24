import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SkeletonComment() {
  return (
    <div className='group/comment flex gap-3 py-3'>
    <span className='inline'>
      {/* Avatar */}
      <Skeleton className="size-10 rounded-full" />
    </span>
    <div className='flex flex-col gap-1 w-full'>
      <div className='flex items-center gap-2 text-sm'>
        {/* username */}
        <Skeleton className="h-2 w-24" />
        {/* date */}
        
      </div>
      <div className='text-sm text-primary'>
        {/* content */}
        <Skeleton className="h-2 w-20" />
      </div>

    </div>
    

    
  </div>
  )
}
