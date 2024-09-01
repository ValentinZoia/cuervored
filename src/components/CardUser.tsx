import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { DefaultSession } from "next-auth";
    import { Session } from "next-auth";
 
  
  interface CardUserProps {
    session: Session | DefaultSession | null;
    role?: "ADMIN" | "USER";
  }
  
  export default function CardUser({ session, role }: CardUserProps) {
    const user = session?.user || {};
  
    return (
      <Card className="m-8 w-[300px] bg-slate-100" >
        <CardHeader>
          {user.image && (
            <img
              src={user.image}
              alt={`${user.name}'s avatar`}
              className="w-16 h-16 rounded-full"
            />
          )}
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Role:</strong> {role}</p>
          </div>
        </CardContent>
        <CardFooter>
          {/* Aquí podrías agregar botones u otras acciones relacionadas con el usuario */}
        </CardFooter>
      </Card>
    );
  }
  