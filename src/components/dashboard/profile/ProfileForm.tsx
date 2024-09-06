import { DefaultSession } from "next-auth";
import { Session } from "next-auth";
import { getUserById } from '@/data/user'
import ProfileFormClient from './ProfileFormClient'

interface ProfileFormProps {
  session: Session | DefaultSession | null;
}

async function getUserData(id: string | undefined) {
  const user = await getUserById(id as string);
  return user
}

export default async function ProfileForm({ session }: ProfileFormProps) {
  const user = await getUserData(session?.user?.id);
  const name = user?.name || ''
  const image = user?.image || ''

  return (
    <ProfileFormClient initialName={name} initialImage={image} />
  )
}