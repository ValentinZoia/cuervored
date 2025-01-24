import React, { useRef } from 'react'
import { useMatchAttendanceMutation } from './mutation'
import { CaslaButton } from '../ui/CaslaButton';
import { debounce } from '../Post/LikeButton';
import { UserMatchAttendanceInfo } from '@/types/User';

interface Props {
    matchId:string;
    initialState: UserMatchAttendanceInfo;
    loggedInUserId:string;
    
}


export function MatchAttendanceButton({matchId,initialState,loggedInUserId}: Props) {
  
  const{data, isLoading, mutate, isPending} = useMatchAttendanceMutation({ matchId,initialState,loggedInUserId });
  
  // Crear una función `debouncedMutate`
    const debouncedMutate = useRef(
      debounce(() => mutate(), 300) // Configura el debounce con un retraso de 300ms
    );
  
    const isDisabled = isPending || isLoading;

    return (
        <CaslaButton size="sm" variant="blueToRed" aria-label="Voy a la cancha" onClick={() => {if (!isDisabled) {debouncedMutate.current();}}} disabled={isDisabled}>
        {data.isUserAttendingMatch ? "No voy a la cancha" : "Voy a la cancha"}
      </CaslaButton>
  )
}
