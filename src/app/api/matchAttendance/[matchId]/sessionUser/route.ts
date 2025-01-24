import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect, UserMatchAttendanceInfo } from "@/types/User";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//obtenemos si el usuario esta anotado para asistir a un partido con matchId
export async function GET(
  req: NextRequest,
  { params: { matchId } }: { params: { matchId: string } }
) {
  try {
    //1. Checkeamos si el usuario esta autenticado
    const session = await auth();
    if (!session)
      return NextResponse.json(
        { error: "No estas autenticado" },
        { status: 401 }
      );


    //2. Checkeamos si hay un matchId
    if (!matchId)
      return NextResponse.json(
        { error: "matchId es requerido" },
        { status: 400 }
      );


    //3. Verificamos si el usuario de la sesión ya estaba en la lista de asistentes
    const sessionUserAttendance = await prisma.matchAttendance.findFirst({
      where: {
        matchId: matchId,
        userId: session.user.id,
      },
      select: getUserDataSelect(session.user.id),
    });

    const data:UserMatchAttendanceInfo ={
        isUserAttendingMatch: !!sessionUserAttendance,
    }

    return NextResponse.json(data, { status: 200 });



  } catch (error: any) {
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

//El usuario se anota para asistir a un partido con un matchId
export async function POST(
  req: NextRequest,
  { params: { matchId } }: { params: { matchId: string } }
) {
  try {
    //1. Checkeamos si el usuario esta autenticado
    const session = await auth();
    if (!session)
      return NextResponse.json(
        { error: "No estas autenticado" },
        { status: 401 }
      );

    //2. Checkeamos si hay un matchId
    if (!matchId)
      return NextResponse.json(
        { error: "matchId es requerido" },
        { status: 400 }
      );

    //3. Obtenemos el matchDate del body
    const body = await req.json();
    const matchDate = new Date(body.matchDate);
    const expiresAt = new Date(matchDate);
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    console.log(matchDate, expiresAt);

    //4. Verificamos si el usuario de la sesión ya está en la lista de asistentes
    const sessionUserAttendance = await prisma.matchAttendance.findFirst({
      where: {
        matchId: matchId,
        userId: session.user.id,
      },
    });

    if (sessionUserAttendance) {
      return NextResponse.json(
        { error: "Ya estas en la lista de asistentes" },
        { status: 400 }
      );
    }

    console.log(sessionUserAttendance);

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
          select: getUserDataSelect(session.user.id),
        },
      },
    });

    console.log(newAttendance.user);

    return NextResponse.json(newAttendance.user, { status: 201 });
  } catch (error: any) {
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

//El usuario se desanota para asistir a un partido con un matchId
export async function DELETE(
  req: NextRequest,
  { params: { matchId } }: { params: { matchId: string } }
) {
  try {
    //1. Checkeamos si el usuario esta autenticado
    const session = await auth();
    if (!session)
      return NextResponse.json(
        { error: "No estas autenticado" },
        { status: 401 }
      );

    //2. Checkeamos si hay un matchId
    if (!matchId)
      return NextResponse.json(
        { error: "matchId es requerido" },
        { status: 400 }
      );

    //3. Verificamos si el usuario de la sesión ya está en la lista de asistentes
    const sessionUserAttendance = await prisma.matchAttendance.findFirst({
      where: {
        matchId: matchId,
        userId: session.user.id,
      },
      select: getUserDataSelect(session.user.id),
    });

    if (!sessionUserAttendance) {
      return NextResponse.json(
        { error: "No se encontró asistencia para eliminar" },
        { status: 404 }
      );
    }

    //4. Eliminamos el registro de la tabla matchAttendance
    const deletedAttendance = await prisma.matchAttendance.deleteMany({
      where: {
        matchId,
        userId: session.user.id,
      },
    });

    if (!deletedAttendance.count) {
      return NextResponse.json(
        { error: "No se encontró asistencia para eliminar" },
        { status: 404 }
      );
    }

    return NextResponse.json(sessionUserAttendance, { status: 200 });
  } catch (error: any) {
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
