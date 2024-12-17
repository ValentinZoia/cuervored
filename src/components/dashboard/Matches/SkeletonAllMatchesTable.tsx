import { Skeleton } from "@/components/ui/skeleton";
import {
  TableCell,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import React from "react";

export default function SkeletonAllMatchesTable() {
  const array = [0, 1, 2, 3];

  return (
    <>
      <div className="w-full  sm:container sm:mx-auto ">
        <Table className="text-xs sm:text-sm">
          <TableHeader className="bg-blueSanlorenzo  text-white ">
            <TableRow className=" text-xs sm:text-sm text-center hover:bg-blueSanlorenzo">
              <TableHead className="px-0 sm:px-4 w-[50px] text-white  rounded-tl-xl text-xs sm:text-sm text-center ">
                Dia
              </TableHead>
              <TableHead className="px-0 sm:px-4 text-white text-xs sm:text-sm  text-center">
                Fecha
              </TableHead>
              <TableHead className="px-0 sm:px-4 text-white text-xs sm:text-sm text-center">
                L / V
              </TableHead>
              <TableHead className=" px-0 sm:px-4 text-white text-xs sm:text-sm text-center">
                Oponente
              </TableHead>
              <TableHead className="px-0 sm:px-4 text-white rounded-tr-xl text-xs sm:text-sm text-center">
                Resultado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-x-2 border-b-2 text-center  ">
            {array.map((index) => (
              <TableRow key={index} className="">
                
                <TableCell className="font-medium p-2 sm:p-4 flex justify-center align-center ">
                  <Skeleton className="h-5 w-10" />
                </TableCell>
                
                <TableCell className="p-2 sm:p-4 ">
                    <div className="flex justify-center align-center">
                        <Skeleton className="h-5 w-4" />
                    </div>
                  
                </TableCell>
                
                <TableCell className="p-2 sm:p-4 flex justify-center align-center">
                  <Skeleton className="h-5 w-5" />
                </TableCell>
                
                <TableCell className="p-2 sm:p-4 ">
                <div className="flex justify-center align-center">
                        <Skeleton className="h-3 w-16" />
                    </div>
                </TableCell>
                
                <TableCell>
                <div className="flex justify-center align-center">
                        <Skeleton className="h-4 w-10" />
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
