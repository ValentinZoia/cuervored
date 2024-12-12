import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect, SearchPage } from "@/types/Post";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req:NextRequest,
    {params:{username}}: {params:{username:string}}
){
    try {
         //Check if the user is authenticated
         const session = await auth();
         if (!session) {
             return NextResponse.json(
                 { error: "Unauthorized: Authentication required" },
                 { status: 401 }
             );
         }

         //Check if there is a username 
         if (!username ) {
             return NextResponse.json(
                 { error: "Username  are required" },
                 { status: 400 }
             );
         }

         const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

        const pageSize = 15;

        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: username,
                    mode: "insensitive",
                },
                NOT: {
                    id: session.user.id,
                },
            },
            select: getUserDataSelect(session.user.id),
            orderBy:{
                createdAt:"desc"
            },
            take: pageSize + 1,
            cursor: cursor ? { id: cursor } : undefined,
        });

        if(!users){
            return NextResponse.json({ error: "No users found" }, { status: 404 });
        }

        const nextCursor = users.length > pageSize ? users[pageSize].id : null;

        const data: SearchPage = {
            users: users.slice(0, pageSize),
            nextCursor
        }

        return NextResponse.json(data);
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