import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect, UserPage } from "@/types/Post";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params: { matchId } }: { params: { matchId: string } }) {
try {
    //Checkeamos si el usuario esta autenticado
    const session = await auth();
    if(!session) return NextResponse.json({ error: "No estas autenticado" }, { status: 401 });

    //Checkeamos si hay un matchId
    if (!matchId) return NextResponse.json({ error: "matchId es requerido" }, { status: 400 });

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 15;

    

   // Primero, verificamos si el usuario de la sesión está en el matchAttendance
   const sessionUserAttendance = await prisma.matchAttendance.findFirst({
    where: {
      matchId: matchId,
      userId: session.user.id,
    },
  });
  

  // Obtenemos todos los asistentes, excluyendo al usuario de la sesión
  const otherAttendees = await prisma.matchAttendance.findMany({
    where: {
      matchId: matchId,
      userId: {
        not: session.user.id,
      },
    },
    include: {
      user: {
        select: getUserDataSelect(session.user.id)
      }
    },
    orderBy: {
      createdAt: "desc",
    },
    take: sessionUserAttendance ? pageSize : pageSize + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

 

  if (!otherAttendees && !sessionUserAttendance) {
    return NextResponse.json({ error: "No se encontraron asistencias" }, { status: 404 });
  }

  // Si el usuario de la sesión está en la lista, lo obtenemos con los campos seleccionados
  let sessionUserData = null;
  if (sessionUserAttendance) {
    sessionUserData = await prisma.matchAttendance.findUnique({
      where: {
        id: sessionUserAttendance.id,
      },
      include: {
        user: {
          select: getUserDataSelect(session.user.id)
        },
      },
    });
  }
  
  // Combinamos los resultados con el usuario de la sesión primero
  const combinedAttendance = sessionUserData 
    ? [sessionUserData, ...otherAttendees]
    : otherAttendees;

  const nextCursor = combinedAttendance.length > pageSize ? combinedAttendance[pageSize].id : null;

  const data: UserPage = {
    users: combinedAttendance.slice(0, pageSize).map((attendance) => attendance.user),
    isUserSession: !!sessionUserAttendance, // true si el usuario está en la lista
    nextCursor,
  };



  return NextResponse.json(data,{ status: 200 });


} catch (error:any) {
        // Manejo detallado de errores
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Errores específicos de Prisma
        if (error.code === "P2025") {
          return NextResponse.json(
            { error: "Database error: Record not found" },
            { status: 500 }
          );
        }
      } else if (error instanceof TypeError) {
        return NextResponse.json(
          { error: "Type error: Invalid input or processing issue" },
          { status: 500 }
        );
      } else if (error instanceof Error && error.message.includes("network")) {
        return NextResponse.json(
          { error: "Network error: Could not connect to database" },
          { status: 500 }
        );
      }
  
      // Error genérico para casos no manejados
      return NextResponse.json(
        { error: "Server error: " + (error.message || "Unknown error") },
        { status: 500 }
      );
    }


}

export async function POST(req: NextRequest, { params: { matchId } }: { params: { matchId: string } }) {
  try {

    //1. Checkeamos si el usuario esta autenticado
    const session = await auth();
    if(!session) return NextResponse.json({ error: "No estas autenticado" }, { status: 401 });



    //2. Checkeamos si hay un matchId
    if (!matchId) return NextResponse.json({ error: "matchId es requerido" }, { status: 400 });


    //3. Obtenemos el matchDate del body
    const body = await req.json();
    const matchDate = new Date(body.matchDate);
    const expiresAt = new Date(matchDate);
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    console.log(matchDate,expiresAt)


    //4. Verificamos si el usuario de la sesión ya está en la lista de asistentes
    const sessionUserAttendance = await prisma.matchAttendance.findFirst({
      where: {
        matchId: matchId,
        userId: session.user.id,
      },
    });

    if (sessionUserAttendance) {
      return NextResponse.json({ error: "Ya estas en la lista de asistentes" }, { status: 400 });
    }

    console.log(sessionUserAttendance)

    //5. Creamos un nuevo registro en la tabla matchAttendance
    const newAttendance = await prisma.matchAttendance.create({
      data: {
        matchId,
        userId: session.user.id,
        matchDate,
        expiresAt,
      },
      include: {
        user: {
          select: getUserDataSelect(session.user.id)
        }
      }
    });

    console.log(newAttendance.user)

    return NextResponse.json(newAttendance.user, { status: 201 });


    
      } catch (error:any) {
            // Manejo detallado de errores
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Errores específicos de Prisma
            if (error.code === "P2025") {
              return NextResponse.json(
                { error: "Database error: Record not found" },
                { status: 500 }
              );
            }
          } else if (error instanceof TypeError) {
            return NextResponse.json(
              { error: "Type error: Invalid input or processing issue" },
              { status: 500 }
            );
          } else if (error instanceof Error && error.message.includes("network")) {
            return NextResponse.json(
              { error: "Network error: Could not connect to database" },
              { status: 500 }
            );
          }
      
          // Error genérico para casos no manejados
          return NextResponse.json(
            { error: "Server error: " + (error.message || "Unknown error") },
            { status: 500 }
          );
        }
}

export async function DELETE(req: NextRequest,{ params: { matchId } }: { params: { matchId: string } }){
  try {
    //1. Checkeamos si el usuario esta autenticado
    const session = await auth();
    if(!session) return NextResponse.json({ error: "No estas autenticado" }, { status: 401 });



    //2. Checkeamos si hay un matchId
    if (!matchId) return NextResponse.json({ error: "matchId es requerido" }, { status: 400 });

    //3. Verificamos si el usuario de la sesión ya está en la lista de asistentes
    const sessionUserAttendance = await prisma.matchAttendance.findFirst({
      where: {
        matchId: matchId,
        userId: session.user.id,
      },
      select: getUserDataSelect(session.user.id),
    });

    if (!sessionUserAttendance) {
      return NextResponse.json({ error: "No se encontró asistencia para eliminar" }, { status: 404 });
    }

    //4. Eliminamos el registro de la tabla matchAttendance
    const deletedAttendance = await prisma.matchAttendance.deleteMany({
      where: {
        matchId,
        userId: session.user.id,
      },
      
    });

    if (!deletedAttendance.count) {
      return NextResponse.json({ error: "No se encontró asistencia para eliminar" }, { status: 404 });
    }

    return NextResponse.json(sessionUserAttendance, { status: 200 });
  } catch (error) {
    
  }
}

