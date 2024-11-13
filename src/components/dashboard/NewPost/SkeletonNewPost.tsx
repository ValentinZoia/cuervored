import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SkeletonNewPost() {
  return (
    <Card className="max-w-[680px] mb-6 bg-card">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          {/*avatar*/ }
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1">
            {/* input */}
            <Skeleton className="h-[80px] w-full mb-2" />

            <div className="mt-2 flex justify-between items-center">
              {/* button agregar foto */}
              <Skeleton className="h-7 w-28 mb-2" />
              
              {/* boton publicar */}
              <Skeleton className="h-7 w-20 mb-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
