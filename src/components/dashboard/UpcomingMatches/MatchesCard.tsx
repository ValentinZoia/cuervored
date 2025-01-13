import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicMatchData } from "@/types/Match";
import { CaslaButton } from "@/components/ui/CaslaButton";
import { CalendarDays } from "lucide-react";

export default function MatchesCard({
    title,
    matches,
    isPastMatches,
  }: {
    title: string;
    matches: BasicMatchData[];
    isPastMatches?: boolean;
  }) {
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {matches?.length > 0 ? (
            matches.map((match, index) => (
              <Card key={index} className="p-2 mb-2">
                <CardContent className="py-4 px-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <CalendarDays className="w-3 h-3 mr-1" />
                      <span className="text-sm font-medium">{match.date}</span>
                    </div>
                    <span
                      className={`text-sm font-semibold px-1 py-0.5 rounded ${
                        match.homeOrAway === "L"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {match.homeOrAway === "L" ? "Local" : "Visitante"}
                    </span>
                  </div>
                  <p className="text-lg font-bold mb-1 flex gap-1 flex-wrap">
                    <span className="flex items-center gap-2">
                    <img
                          src={"https://www.promiedos.com.ar/images/18/19.png"}
                          alt={"Escudo Sanlorenzo"}
                          className="w-[18px] h-[20px] "
                        />
                    San Lorenzo vs
                    </span>
                    
                    <span className="flex items-center gap-2">
                    <img
                          src={match.opponentImage}
                          alt={"Escudo " + match.opponent}
                          className="w-[18px] h-[20px] "
                        />
                      {" " + match.opponent}
                    </span>   
                  </p>
                  {match.homeOrAway === "L" && (
                    <div className="flex mt-1 flex-wrap gap-2">
                      {isPastMatches ? (
                        <CaslaButton size="sm" variant="redToBlue" aria-label="Ver quienes fueron">
                          Ver quienes fueron
                        </CaslaButton>
                      ) : (
                        <>
                          <CaslaButton size="sm" variant="blueToRed" aria-label="Voy a la cancha">
                            Voy a la cancha
                          </CaslaButton>
                          <CaslaButton size="sm" variant="redToBlue" aria-label="Ver quienes van">
                            Ver quienes van
                          </CaslaButton>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              {isPastMatches ? (
                <>
                  <p className="text-sm text-gray-600">
                    No hay partidos disponibles o Recién comienza la temporada.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600">
                    No hay partidos próximos en lo que queda del año.
                  </p>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    );
  }


