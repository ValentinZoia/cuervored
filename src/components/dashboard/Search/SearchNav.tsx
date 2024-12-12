import React from 'react'
import ArrowBack from '../ArrowBack'
import SearchField from '../NavBar/SearchField'

export default function SearchNav() {
  return (
    <div className='border-x-[1px] border-t-[1px] w-full flex justify-start items-center gap-4 h-[53px] px-2 bg-card'>
        <div>
            <ArrowBack />
            
        </div>
        <div>
            <SearchField />

        </div>
    </div>
  )
}
