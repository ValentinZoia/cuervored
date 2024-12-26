import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicMatchData } from "@/types/Match";
import { CaslaButton } from "@/components/ui/CaslaButton";
import { CalendarDays } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonMatchesCard({
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
          
              <Card  className="p-2 mb-2">
                <CardContent className="py-4 px-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <CalendarDays className="w-3 h-3 mr-1" />
                      
                      <span className="text-sm font-medium"> 
                        {/* fecha */}
                        <Skeleton className="h-3 w-8" />
                      </span>
                    </div>
                    <span
                      className={`text-sm font-semibold px-1 py-0.5 rounded `}
                    >
                      {/* L / V */}
                      <Skeleton className="h-6 w-16" />
                    </span>
                  </div>
                  <div className="text-lg font-bold mb-1">
                    {/* Oponente */}
                    <Skeleton className="h-4 w-40 md:w-36 lg:w-48 xl:w-52 " />
                  </div>
                  
                    <div className="flex mt-4 flex-wrap gap-2">
                      {/* Boton */}
                      <Skeleton className="h-8 w-40" />
                    </div>
                  
                </CardContent>
              </Card>
          
        </CardContent>
      </Card>
    );
  }
