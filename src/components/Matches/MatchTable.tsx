
import React, { useState } from 'react';
import Image from 'next/image';
import { BasicMatchData } from '@/types/Match';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';


const Table = dynamic(() => import('@/components/ui/table').then(mod => mod.Table), {ssr: false });
const TableBody = dynamic(() => import('@/components/ui/table').then(mod => mod.TableBody), {ssr: false });
const TableCell = dynamic(() => import('@/components/ui/table').then(mod => mod.TableCell), {ssr: false });
const TableHead = dynamic(() => import('@/components/ui/table').then(mod => mod.TableHead), {ssr: false });
const TableRow = dynamic(() => import('@/components/ui/table').then(mod => mod.TableRow), {ssr: false });
const TableHeader = dynamic(() => import('@/components/ui/table').then(mod => mod.TableHeader), {ssr: false });


interface MatchTableProps {
  matches: BasicMatchData[];
  isPastMatches: boolean;
}

export default function MatchTable({matches, isPastMatches}: MatchTableProps) {
    //renderizar solo los 7 primeros partidos
    const [showAll, setShowAll] = useState(false);
    const visibleMatches = showAll ? matches : matches.slice(0, 7);

    //ponerle colores a los resultados si perdio, gano o empato
    const getResultColor = (result: string | null, homeOrAway: string | null) => {
        if (!result) return '';
        const [goalsFor, goalsAgainst] = result.split('-').map(Number);
        if ((goalsFor > goalsAgainst && homeOrAway === 'L') || (goalsFor < goalsAgainst && homeOrAway === 'V')) return 'text-green-500';
        if ((goalsFor < goalsAgainst && homeOrAway === 'L') || (goalsFor > goalsAgainst && homeOrAway === 'V')) return 'text-red-500';
        return 'text-yellow-500';
      };
    
      return (
        <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Día</TableHead>
            <TableHead className="text-center">L/V</TableHead>
            <TableHead className="text-center">Oponente</TableHead>
            <TableHead className="text-center">{isPastMatches ? 'Res' : 'Hora'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='border-b-[1px]'>
          {visibleMatches.map((match, index) => (
            <TableRow key={index}>
              <TableCell className="p-1 items-center text-center font-medium">{match.date}</TableCell>
              <TableCell className='p-1 items-center text-center'>{match.homeOrAway}</TableCell>
              <TableCell className='p-0 pr-1'>
                <div className="min-w-[100%] flex justify-start items-center">
                  {match.opponentImage && (
                    <div className='relative left-0 min-w-6 h-6 w-6 flex items-center justify-center p-1'>
                      <Image
                        src={match.opponentImage}
                        alt={match.opponent || ''}
                        width={16}
                        height={16}
                        className="max-h-4  max-w-16 h-auto w-auto object-cover"
                      />
                    </div>
                  )}
                  {match.opponent}
                </div>
              </TableCell>
              <TableCell className={`p-1 pr-2 text-center ${isPastMatches ? getResultColor(match.result, match.homeOrAway) : ''}`}>
                {isPastMatches ? match.result : match.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {matches.length > 7 && (
        <div className="h-10 text-center">
          <Button aria-label='Ver más' onClick={() => setShowAll(!showAll)} variant={"ghost"} className='w-full h-full'>
            {showAll ? 'Ver menos' : 'Ver más'}
          </Button>
        </div>
      )}
    </div>
  );
};