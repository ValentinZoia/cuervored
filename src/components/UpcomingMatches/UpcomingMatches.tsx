
import React, { lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { auth } from "@/auth";
import { getUserDataById } from "@/data/user";
import { UserData } from "@/types/User";





interface UpcomingMatchesProps {
  className?: string;
}

const UpcomingMatchesData = lazy(() => import("./UpcomingMatchesData"));



export default async function UpcomingMatches({ className }: UpcomingMatchesProps) {
  const session = await auth();
   const user:UserData = await getUserDataById(session?.user.id as string);
  
  return (
    <Card className={`${className}  lg:col-span-1 lg:h-fit`} >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Partidos de San Lorenzo</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">  
        <div className="space-y-2">
          <UpcomingMatchesData user={user} />
        </div>
      </CardContent>
    </Card>
  );
}
