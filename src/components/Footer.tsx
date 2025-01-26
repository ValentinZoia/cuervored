import Link from "next/link"
import {  } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-card text-primary py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Nuestra Compañía</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-muted-foreground">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-muted-foreground">
                  Carreras
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-muted-foreground">
                  Prensa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Comunidad</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-muted-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-gray-">
                  Foro
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-muted-foreground">
                  Eventos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-muted-foreground">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-muted-foreground">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-muted-foreground">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>&copy; 2025 CuervoRed. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

