import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export const TableSkeleton: React.FC = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableHead>
            <TableHead className="text-center"><Skeleton className="h-4 w-8 mx-auto" /></TableHead>
            <TableHead className="text-center"><Skeleton className="h-4 w-20 mx-auto" /></TableHead>
            <TableHead className="text-center"><Skeleton className="h-4 w-12 mx-auto" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(7)].map((_, index) => (
            <TableRow key={index}>
              <TableCell className="p-1 items-center text-center">
                <Skeleton className="h-4 w-16 mx-auto" />
              </TableCell>
              <TableCell className='p-1 items-center text-center'>
                <Skeleton className="h-4 w-8 mx-auto" />
              </TableCell>
              <TableCell className='p-0 pr-1'>
                <div className="min-w-[100%] flex justify-start items-center">
                  <Skeleton className="h-6 w-6 rounded-full mr-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </TableCell>
              <TableCell className='p-1 pr-2 text-center'>
                <Skeleton className="h-4 w-12 mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export  const MatchTablesSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-center items-start lg:space-x-8 space-y-8 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <Skeleton className="h-8 w-48 mb-4 mx-auto" />
          <div className="border rounded-lg overflow-hidden">
            <TableSkeleton />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Skeleton className="h-8 w-48 mb-4 mx-auto" />
          <div className="border rounded-lg overflow-hidden">
            <TableSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

