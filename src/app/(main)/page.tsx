import { auth } from "@/auth"
import Publications from "@/components/Publications"
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
        <Publications />
      </main>
    </>
  )
}

