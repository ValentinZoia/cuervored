"use client"
import React, { lazy } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel,  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { deleteAccount } from './actions'
import { toast } from '../ui/use-toast'

import { DefaultSession, Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useQueryClient } from '@tanstack/react-query'


//lazy para componentes de shadcn/ui que no se muestran inmediatamente:
const AlertDialogContent = lazy(() => import('../ui/alert-dialog').then(mod => ({ 
  default: mod.AlertDialogContent 
})));

export default function DeleteAccountCard({session}:{session:Session |DefaultSession | null}) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  
  const handleConfirmTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmText(e.target.value);
  };
  
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const {ok, error, message} = await deleteAccount(session?.user?.id as string);
      if(ok){
        setIsDeleting(false);
        setConfirmText("");
        signOut();
        queryClient.clear();
        router.push('/auth/login');
        
       
       
        toast({
          title: 'Cuenta eliminada',
          description: message,
          variant: 'success',
        });
        
        return;
      }
      
      setIsDeleting(false);
      setConfirmText("");
      toast({
        title: "Ocurrió un error al eliminar la cuenta",
       
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive"
      });
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
      setConfirmText("");
      toast({
        title: "Ocurrió un error al eliminar la cuenta",
        description: err instanceof Error ? err.message : 'Error desconocido',
        variant: "destructive"
      });
    }
  };
  
  
  return (
    <Card className="mt-6">
    <CardHeader>
      <CardTitle className="text-red-600">Zona de peligro</CardTitle>
      <CardDescription>Acciones irreversibles para tu cuenta.</CardDescription>
    </CardHeader>
    <CardContent>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Eliminar cuenta</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta
              y removerá tus datos de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Escribe "Eliminar cuenta {session?.user?.name && session.user.name}" para confirmar:
                  </p>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={handleConfirmTextChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Eliminar cuenta ${session?.user?.name && session.user.name}`}
                  />
                </div>
          <AlertDialogFooter>
            <AlertDialogCancel className='bg-blueSanlorenzo hover:bg-blueSanlorenzo' onClick={() => setConfirmText("")}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeleting || confirmText !== `Eliminar cuenta ${session?.user?.name && session.user.name}`} className='bg-redSanlorenzo hover:bg-redSanlorenzo'>
              {isDeleting ? 'Eliminando...' : 'Sí, eliminar mi cuenta'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardContent>
  </Card>
  )
}
