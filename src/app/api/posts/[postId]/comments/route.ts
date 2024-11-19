import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { CommentsPage, getCommentDataInclude } from "@/types/Post";
import { Prisma } from "@prisma/client";
import { create } from "domain";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {

    try {
        //Check if the user is authenticated
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized: Authentication required" },
                { status: 401 }
            );
        }

        //Check if there is a postId
        if (!postId) {
            return NextResponse.json(
                { error: "Post ID is required" },
                { status: 400 }
            );
        }


        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

        const pageSize = 2;

        const comments = await prisma.comment.findMany({
            where:{postId:postId},
            include: getCommentDataInclude(session.user.id),
            orderBy: {createdAt: "asc"},
            take: -pageSize - 1 ,
            cursor: cursor ? { id: cursor } : undefined,
        });

        
        
        if (!comments) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        

        const previousCursor = comments.length > pageSize ? comments[0].id : null;

        const data: CommentsPage = {
            comments: comments.length > pageSize ? comments.slice(1) : comments,
            previousCursor,
        }

        
        return NextResponse.json(data);


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

