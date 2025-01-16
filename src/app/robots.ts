
/*
Los robots.txt son un estándar web fundamental que funciona como un conjunto de instrucciones para los robots de búsqueda (también llamados web crawlers o arañas web). Te explico los aspectos más importantes:
¿Qué es robots.txt?
Es un archivo de texto que se coloca en la raíz de tu sitio web (ejemplo: www.tusitio.com/robots.txt) que actúa como un "protocolo de exclusión de robots". Es lo primero que buscan los bots cuando visitan tu sitio.
¿Para qué sirve?

Control de acceso:

Define qué partes de tu sitio pueden ser rastreadas
Indica qué áreas están prohibidas para los bots
Ayuda a gestionar el tráfico de rastreo


Optimización SEO:

Evita la indexación de contenido duplicado
Protege contenido sensible o privado
Ayuda a los motores de búsqueda a indexar tu sitio eficientemente
*/

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/*',
        '/[username]',
        '/search',
        '/matches',
      ],
      disallow: [
        '/settings',  // Páginas privadas de configuración
        '/api/*',              // Rutas de API
        '/auth/*',             // Rutas de autenticación
        '/_next/*',            // Archivos internos de Next.js
        '/admin/*',            // Área de administración si existe
        '/*.json',             // Archivos JSON
        '/*.xml',              // Archivos XML
        '/private/*',          // Cualquier ruta privada
      ]
    },
    sitemap: `${baseUrl}/sitemap.xml`,  // Referencia a tu sitemap
  }
}