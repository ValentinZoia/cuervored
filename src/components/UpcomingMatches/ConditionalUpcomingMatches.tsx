"use client"
import { useBreakpoint } from '@/hooks/useBreakpoint'
import dynamic from 'next/dynamic'
import SkeletonMatchesCard from './SkeletonMatchesCard'
import { Loader2 } from 'lucide-react'

const UpcomingMatches = dynamic(() => import('@/components/UpcomingMatches/UpcomingMatches'), {
  ssr: false,
  loading: () => <div className='w-full py-4 flex justify-center'><Loader2 className="animate-spin text-blue-500" aria-hidden="true" /></div>
})

export function ConditionalUpcomingMatches() {
  const isLargeScreen = useBreakpoint()

  if (!isLargeScreen) return null

  return <UpcomingMatches />
}