import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonMatchesCard({
    title,
    
  }: {
    title: string;
    
  }) {
    return (
      
      // <Card className="mb-4"> 
      //   <CardHeader>
      //     <CardTitle className="text-lg">{title}</CardTitle>
      //   </CardHeader>
      //   <CardContent>
          
      //         <Card  className="p-2 mb-2">
      //           <CardContent className="py-4 px-2">
      //             <div className="flex items-center justify-between mb-1">
      //               <div className="flex items-center">
      //                 <CalendarDays className="w-3 h-3 mr-1" />
                      
      //                 <span className="text-sm font-medium"> 
      //                   {/* fecha */}
      //                   <Skeleton className="h-3 w-8" />
      //                 </span>
      //               </div>
      //               <span
      //                 className={`text-sm font-semibold px-1 py-0.5 rounded `}
      //               >
      //                 {/* L / V */}
      //                 <Skeleton className="h-6 w-16" />
      //               </span>
      //             </div>
      //             <div className="text-lg font-bold mb-1">
      //               {/* Oponente */}
      //               <Skeleton className="h-4 w-40 md:w-36 lg:w-48 xl:w-52 " />
      //             </div>
                  
      //               <div className="flex mt-4 flex-wrap gap-2">
      //                 {/* Boton */}
      //                 <Skeleton className="h-8 w-40" />
      //               </div>
                  
      //           </CardContent>
      //         </Card>
          
      //   </CardContent>
      // </Card>
      <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        
          <ul className="divide-y divide-border">
            
              <li  className="p-3 hover:bg-border transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* <Image
                      src={match.homeOrAway === "L" ? "https://api.promiedos.com.ar/images/team/igf/1": match.opponentImage as string}
                      alt={match.homeOrAway === "L" ? "Escudo de San Lorenzo": "Escudo de " + match.opponent}
                      width={16}
                      height={16}
                      className="max-h-4  max-w-16 h-auto w-auto object-cover"
                    /> */}
                    <Skeleton className="h-6 w-6 rounded-lg" />
                    <Skeleton className="h-6 w-6 rounded-lg" />
                   

                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        
                        {/* Barcelona vs Sanlorenzo */}
                        <Skeleton className="h-2.5 w-32 mb-1"  />
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <CalendarDays className="w-3 h-3 mr-1" />
                        {/* Fecha ej: 2024-02-01 */}
                        <Skeleton className="h-2 w-16"  />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full`}
                    >
                      {/* Bola de V o L */}
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </span>
                    
                  </div>
                </div>
                
                  <div className="mt-2 flex justify-between">
                    
                  <Skeleton className="h-7 w-24" />
                  
                    
                     
                    
                  </div>
                
              </li>
            
          </ul>
        
      </CardContent>
    </Card>
    );
  }
