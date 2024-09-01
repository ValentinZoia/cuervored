
import { auth , signOut} from "@/auth";
import CardUser from "@/components/CardUser";


export default async function DashboardPage() {
 const session = await auth();
  // console.log(session)
 
  return (
    <div>
      <CardUser session={session} role={session?.user?.role} />
      <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button className=" bg-red-500 text-white p-4 rounded-md" type="submit">Sign Out</button>
    </form>
    </div>
  );
}
