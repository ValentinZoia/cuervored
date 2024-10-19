
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonPost() {
  return (
    <Card className='max-w-[680px] z-10'>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-2 w-24" />
            <Skeleton className="h-2 w-12" />
            
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Skeleton className="m-auto h-[500px] w-full" />
        
        <div className="flex items-center space-x-4 mb-4 mt-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
          
        </div>
        <Skeleton className="h-3 w-20 mb-2" />
        
        <Skeleton className="h-3 w-24 mb-4" />
        
      </CardContent>
    </Card>
  );
}
