
import { Metadata } from 'next'
import './globals.css'
import { Providers } from './Provider'
import { Toaster } from '@/components/ui/toaster'


export const metadata:Metadata ={
    title:{
      default:"",
      template:" %s | CuervoRed",
    },
    description:"Una simple red social para hinchas de San lorenzo.",
    twitter:{
      card:"summary_large_image",
    },
   icons:[{rel:"icon",url:"/favicon.ico"}],
    
    authors:[{name:"Valentin Zoia"}],
    creator:"Valentin Zoia",
    publisher:"Valentin Zoia",
    keywords:["San Lorenzo","Red Social","Hinchas","Futbol","Argentina","CuervoRed","Cuervo","SL","San Lorenzo de Almagro","Valentin Zoia","Iker Muniain","AzulGrana","oficial","Oficial","Moretti","Valentin","Zoia","Iker","Muniain","Moretti","Azul","Grana","SLdeA","SLdeAlmagro","SLdeAlmagroOficial","SLdeA"],
  }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
      
      </head>
      <body >
        <Providers>
          
           {children} 
          
          
        </Providers>
        <Toaster />
        </body>
        
      

    </html>
  )
}