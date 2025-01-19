import React from 'react'
import CuervoRed_LOGO_TEXTO from './icons/CuervoRed_LOGO_TEXTO'

export default function SplashScreen() {
  return (
    <>
    <div className="fixed inset-0 bg-blueSanlorenzo flex flex-col items-center justify-center z-50 animate-fadeOut">
  <main className="text-center">
    <CuervoRed_LOGO_TEXTO />
  </main>

  <footer className="absolute bottom-0 mb-8 text-center text-md text-gray-200">
    <p>Creado por Valentin Zoia</p>
    <p>&copy; {new Date().getFullYear()} CuervoRed. Todos los derechos reservados.</p>
  </footer>
</div>
   
    </>
    
  )
}
