import { auth } from "@/auth";
import ProfileForm from "@/components/dashboard/profile/ProfileForm";


export default async function ProfilePage() {
  const session = await auth();
  return (
    <div>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <ProfileForm session={session} />
      </div>
    </div>
  );
}
