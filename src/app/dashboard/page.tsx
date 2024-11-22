
import { auth } from "@/auth";
import Publications from "@/components/dashboard/Publications";





export default async function DashboardPage() {
  const session = await auth();


  if (!session) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  }
 
  return (
    <>
    <Publications />
    </>
  );
}
