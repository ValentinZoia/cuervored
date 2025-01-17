
import React, { lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";





interface UpcomingMatchesProps {
  className?: string;
}

const UpcomingMatchesData = lazy(() => import("./UpcomingMatchesData"));


export default function UpcomingMatches({ className }: UpcomingMatchesProps) {
  return (
    <Card className={`${className}  lg:col-span-1 lg:h-fit`} >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Partidos de San Lorenzo</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <UpcomingMatchesData />
        </div>
      </CardContent>
    </Card>
  );
}
