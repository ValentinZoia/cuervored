import { auth } from "@/auth"
import NewPost from "@/components/NewPost/NewPost"
import Publications from "@/components/Publications"
import { Card, CardContent } from "@/components/ui/card"
import dynamic from "next/dynamic"

// Importamos SplashScreen de forma dinámica para evitar problemas con SSR
const SplashScreen = dynamic(() => import("@/components/SplashScreen"), { ssr: false })

export default async function Home() {
  const session = await auth()
  
  if (!session) {
    return (
      <div>
        <h1>No estás autorizado para ver esta página.</h1>
      </div>
    )
  }

  return (
    <>
      <SplashScreen />
      <main className="min-h-screen h-fit w-full">
        <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none  sm:mx-auto">
        <CardContent>
          <NewPost session={session}/>
        <Publications />
         </CardContent>
      </Card>
      </main>
    </>
  )
}

