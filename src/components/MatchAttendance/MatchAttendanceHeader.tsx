import React from 'react'
import Image from 'next/image'

interface MatchAttendanceHeaderProps {
    oponent:string;
    oponentImage:string;
    date:string;
    
}

export default function MatchAttendanceHeader({oponent, oponentImage, date}:MatchAttendanceHeaderProps) {
  return (
    <section className='flex flex-col items-center justify-center gap-3 w-full h-full bg-card border-b-[1px] border-x-[1px] pt-4'>

    <div>
        <h1 className='mb-4 text-center text-2xl text-gray-200'>
            {`San Lorenzo vs ${oponent}`}
        </h1>
    </div>


    <div className='flex items-center justify-center gap-2'>
        <Image src="https://api.promiedos.com.ar/images/team/igf/2" alt="Escudo de San Lorenzo" width={100} height={100} className="max-h-24  max-w-24 h-auto w-auto object-cover" />

        vs
        
        <Image src={oponentImage} alt={`Escudo de ${oponent}`} width={100} height={100} className="max-h-24  max-w-24 h-auto w-auto object-cover"/>
    </div>


    <div>
        <h2 className='mb-8 text-center text-md text-gray-200'>
            {`${date}`}
        </h2>
    </div>
    </section>
  )
}
