import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";

const matches = [
  { date: "2024-04-15", opponent: "River Plate", isHome: true },
  { date: "2024-04-22", opponent: "Boca Juniors", isHome: false },
  { date: "2024-04-29", opponent: "Racing Club", isHome: true },
];

export default function UpcomingMatches() {
  return (
    <Card className="hidden lg:block lg:col-span-1 lg:h-fit" >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Proximos partidos</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {matches.map((match, index) => (
            <Card key={index} className="p-2">
              <CardContent className=" py-4 px-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <CalendarDays className="w-3 h-3 mr-1" />
                    <span className="text-sm font-medium">{match.date}</span>
                  </div>
                  <span
                    className={`text-sm font-semibold px-1 py-0-5 rounded ${
                      match.isHome
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                    > {match.isHome ? "Local" : "Visitante"}
                  </span>
                </div>
                <p className="text-lg font-bold mb-1">San Lorenzo vs {match.opponent}</p>
                {match.isHome &&(
                    <div className="flex  mt-1 flex-wrap gap-2">
                    <Button size="sm" variant="outline">Voy a la cancha</Button>
                    <Button size="sm" variant="outline">Ver quienes van</Button>
                    </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
