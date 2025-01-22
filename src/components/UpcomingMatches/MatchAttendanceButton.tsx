import React, { useRef } from 'react'
import { useMatchAttendanceMutation } from './mutation'
import { CaslaButton } from '../ui/CaslaButton';
import { debounce } from '../Post/LikeButton';

interface Props {
    matchId:string
    
}


export function MatchAttendanceButton({matchId}: Props) {
  
  const{ mutate, isPending} = useMatchAttendanceMutation({ matchId, isAttending: false });
  
  // Crear una función `debouncedMutate`
    const debouncedMutate = useRef(
      debounce(() => mutate(), 300) // Configura el debounce con un retraso de 300ms
    );
  
    const isDisabled = isPending;

    return (
        <CaslaButton size="sm" variant="blueToRed" aria-label="Voy a la cancha" onClick={() => {if (!isDisabled) {debouncedMutate.current();}}} disabled={isDisabled}>
        Voy a la cancha
      </CaslaButton>
  )
}
