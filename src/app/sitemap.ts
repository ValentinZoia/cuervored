/*
Los sitemaps son archivos XML que actúan como un mapa de tu sitio web para los motores de búsqueda. Te explico los aspectos más importantes:
¿Qué es un Sitemap?
Es un archivo XML que lista todas las URLs importantes de tu sitio web, proporcionando metadatos sobre cada URL: cuándo se actualizó por última vez, frecuencia de cambios y su importancia relativa.
¿Para qué sirve?

Mejora el rastreo:

Ayuda a los buscadores a encontrar todas tus páginas
Facilita la indexación de contenido nuevo
Asegura que no se pierdan páginas importantes


Optimización SEO:

Prioriza el contenido importante
Mejora la visibilidad en búsquedas
Acelera la indexación de nuevo contenido

*/

import { getAllUsers } from "@/data/user";
import { User } from "@prisma/client";
import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

const STATIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/dashboard",
  "/dashboard/search",
  "/dashboard/matches",
  "/dashboard/settings",
] as const;

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency?: "daily" | "yearly";
  priority: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all users in parallel with static route processing
  const usersPromise = getAllUsers();

  // Generate static routes while waiting for users
  const staticEntries: SitemapEntry[] = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  // Process user routes once data is available
  const users = await usersPromise;
  const userEntries: SitemapEntry[] = users.map(
    ({ name, createdAt }: User) => ({
      url: `${BASE_URL}/dashboard/users/${name}`,
      lastModified: new Date(createdAt),
      changeFrequency: "daily",
      priority: 0.8,
    })
  );

  return [...staticEntries, ...userEntries];
}
