import { useQuery } from "@tanstack/react-query";
import { AllMatchesData, MatchesData } from "@/types/Match";

interface UseQueryMatchesProps<T> {
  queryKey: string;
  fetchFn: () => Promise<T>;
  type: T;
}

interface CachedData<T> {
  data: T;
  expiryTime: number;
}

const CACHE_KEYS = {
  filtered: 'football-matches-filtered-cache',
  all: 'football-matches-all-cache'
};

// Función auxiliar para determinar el tipo de cache basado en el queryKey
const getCacheKey = (queryKey: string) => {
  return queryKey.toLowerCase().includes('all') ? CACHE_KEYS.all : CACHE_KEYS.filtered;
};

export function useQueryMatches<T extends AllMatchesData | MatchesData>({
  queryKey,
  fetchFn,
  type
}: UseQueryMatchesProps<T>) {
  // Función para calcular el tiempo de expiración basado en el próximo partido
  const calculateExpiryTime = (data: T): number => {
    let nextMatch;
    
    if ('matchesFiltered' in data) {
      // Si es MatchesData
      nextMatch = (data as MatchesData).matchesFiltered.UpcomingMatches[0];
    } else {
      // Si es AllMatchesData
      nextMatch = (data as AllMatchesData).AllMatches.UpcomingMatches[0];
    }

    if (!nextMatch?.date || !nextMatch?.time) {
      // Si no hay fecha/hora, cache por 1 hora
      return Date.now() + 60 * 60 * 1000;
    }

    // Convertir fecha y hora a timestamp
    const [day, month] = nextMatch.date.split('/');
    const [hours, minutes] = nextMatch.time.split(':');
    const matchDate = new Date();
    matchDate.setDate(parseInt(day));
    matchDate.setMonth(parseInt(month) - 1);
    matchDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Añadir 120 minutos (duración del partido) al tiempo del partido
    const expiryTime = matchDate.getTime() + (120 * 60 * 1000);
    return expiryTime;
  };

  // Función para verificar si el cache es válido
  const isValidCache = (cachedData: CachedData<T>): boolean => {
    return cachedData.expiryTime > Date.now();
  };

  // Función para obtener datos del cache
  const getCachedData = (): T | null => {
    try {
      const cacheKey = getCacheKey(queryKey);
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return null;

      const cachedData: CachedData<T> = JSON.parse(cached);
      if (!isValidCache(cachedData)) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return cachedData.data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  };

  // Función para guardar datos en cache
  const setCachedData = (data: T) => {
    try {
      const cacheData: CachedData<T> = {
        data,
        expiryTime: calculateExpiryTime(data),
      };
      const cacheKey = getCacheKey(queryKey);
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  };

  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: async () => {
      // Intentar obtener datos del cache primero
      const cachedData = getCachedData();
      
      if (cachedData) {
        return cachedData;
      }

      // Si no hay cache válido, hacer la petición
      const freshData = await fetchFn();
      setCachedData(freshData);
      return freshData;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 días
    refetchOnWindowFocus: false,
    retry: 2,
  });
}