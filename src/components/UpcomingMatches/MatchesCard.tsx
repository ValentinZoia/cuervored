import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicMatchData } from "@/types/Match";
import { CaslaButton } from "@/components/ui/CaslaButton";
import { CalendarDays } from 'lucide-react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import {MatchAttendanceButton} from "./MatchAttendanceButton";


export default function MatchesCard({
  title,
  matches,
}: {
  title: string;
  matches: BasicMatchData[];
}) {
const router = useRouter();
const handleClick=(id:string)=>{
router.push(`/match-attendance/${id}`)
}




  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {matches?.length > 0 ? (
          <ul className="divide-y divide-border">
            {matches.map((match, index) => (
              <li key={index} className="p-3 hover:bg-border transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={match.homeOrAway === "L" ? "https://api.promiedos.com.ar/images/team/igf/1": match.opponentImage as string}
                      alt={match.homeOrAway === "L" ? "Escudo de San Lorenzo": "Escudo de " + match.opponent}
                      width={16}
                      height={16}
                      className="max-h-4  max-w-16 h-auto w-auto object-cover"
                    />
                    <Image
                      src={match.homeOrAway === "V" ? "https://api.promiedos.com.ar/images/team/igf/1": match.opponentImage as string}
                      alt={match.homeOrAway === "V" ? "Escudo de San Lorenzo": "Escudo de " + match.opponent}
                      width={16}
                      height={16}
                      className="max-h-4  max-w-16 h-auto w-auto object-cover"
                    />

                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        
                        {match.homeOrAway === "L" ? "San Lorenzo " : match.opponent }
                        {" "}
                        {match.isPastMatches ? match.result : "vs"}
                        {" "}
                        {match.homeOrAway === "L" ? match.opponent : "San Lorenzo"}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <CalendarDays className="w-3 h-3 mr-1" />
                        {match.date} {!match.isPastMatches && `- ${match.time}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        match.homeOrAway === "L"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {match.homeOrAway === "L" ? "L" : "V"}
                    </span>
                    
                  </div>
                </div>
                {match.homeOrAway === "L" && (
                  <div className="mt-2 flex justify-between">
                    {match.isPastMatches ? (
                    <CaslaButton size="sm" variant="redToBlue" aria-label="Ver quienes fueron" onClick={()=>{handleClick(match.id)}}>
                      Ver quienes fueron
                    </CaslaButton>
                  ) : (
                    <>
                      <MatchAttendanceButton matchId={match.id}  />
                      <CaslaButton size="sm" variant="redToBlue" aria-label="Ver quienes van" onClick={()=>{handleClick(match.id)}}>
                        Ver quienes van
                      </CaslaButton>
                    </>
                  )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 p-4">
            {matches[0]?.isPastMatches
              ? "No hay partidos disponibles o recién comienza la temporada."
              : "No hay partidos próximos en lo que queda del año."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

