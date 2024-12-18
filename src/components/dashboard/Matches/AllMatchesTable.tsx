import { BasicMatchData } from "@/types/Match";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Home, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AllMatchesTableProps {
  matches: BasicMatchData[];
}

export default function AllMatchesTable({ matches }: AllMatchesTableProps) {
  if (!matches) return <p>No hay partidos</p>;

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
            {matches &&
              matches.map((match, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium p-2 sm:p-4 ">
                    {match.date}
                  </TableCell>
                  <TableCell className="p-2 sm:p-4">
                    {match.round && match.round.startsWith("emoji_events") ? (
                      <div className="flex justify-center align-center">
                        <Trophy className="h-4 w-4 text-yellow-500 align-middle text-center " />
                      </div>
                    ) : (
                      match.round
                    )}
                  </TableCell>
                  <TableCell className="p-2 sm:p-4">
                    {match.homeOrAway === "L" ? (
                      <div className="flex justify-center align-center">
                        <Home className="h-4 w-4 text-blue-500 flex justify-center align-center" />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center align-middle">
                        <Home className="h-4 w-4 text-gray-500" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="p-2 sm:p-4 ">
                    <div className="w-full flex justify-start">
                      <div className="flex gap-2 md:pl-12 justify-center items-center align-middle ">
                        <img
                          src={match.opponentImage}
                          alt={"Escudo "  +  match.opponent}
                          className="w-[18px] h-[20px] "
                        />
                        <p>{match.opponent}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{match.result}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
