import React from 'react'
import UpcomingMatches from './UpcomingMatches'
import { RecommendedUsers } from './RecommendedUsers'

import PublicationsServer from './PublicationsServer'

export default function ClubDashboard() {
  return (
    <main className='flex-1 h-full container py-8 px-2'>
      <div className=' grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6'>

      {/* Columna izquierda: Proximos partidos y Usarios recomendados */}
        <div className='space-y-6'>
          <UpcomingMatches />
          <RecommendedUsers />
        </div>
        
      {/* Columna Central: Publicaciones */}
        <PublicationsServer />
      
      </div>
    </main>
  )
}
