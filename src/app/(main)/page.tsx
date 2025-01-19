import { auth } from "@/auth";
import Publications from "@/components/Publications";
import SplashScreen from "@/components/SplashScreen";





export default async function Home() {
  const session = await auth();


  if (!session) {
    return (
      <div>
        <h1>No estas autorizado para ver esta página.</h1>
      </div>
    );
  }
 
  return (
    <>
      <SplashScreen />
      <main className="min-h-screen h-fit w-full">
        <Publications />
      </main>
    </>
    
  );
}
