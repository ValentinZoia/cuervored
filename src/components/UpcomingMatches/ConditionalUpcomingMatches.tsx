"use client"
import { useBreakpoint } from '@/hooks/useBreakpoint'
import dynamic from 'next/dynamic'
import SkeletonMatchesCard from './SkeletonMatchesCard'


const UpcomingMatches = dynamic(() => import('@/components/UpcomingMatches/UpcomingMatches'), {
  ssr: false,
  loading: () => <SkeletonMatchesCard title="Cargando..." />
})

export function ConditionalUpcomingMatches() {
  const isLargeScreen = useBreakpoint()

  if (!isLargeScreen) return null

  return <UpcomingMatches />
}