import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import exp from "constants"

 function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#263d54" }}>
      <div className="max-w-md w-full px-6 py-12 flex flex-col items-center text-center gap-6">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src="/CuervoRed-LOGO-192x192.png"
            alt="Logo Cuervo"
            fill
            sizes="192px"
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h1 className="text-4xl font-bold text-white">
          Página no encontrada
        </h1>
        <p className="text-lg text-gray-300">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button 
          asChild
          className="mt-4 text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#d94a36" }}
        >
          <Link href="/">
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}




export default NotFound