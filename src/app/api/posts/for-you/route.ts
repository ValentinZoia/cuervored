import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/types/Post";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {


    //get searchParmas
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 5;
    



    // Check if the user is authenticated
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Authentication required" },
        { status: 401 }
      );
    }

    



    // get posts for you to db
    const postsForYou = await prisma.post.findMany({
      include:{
        ...getPostDataInclude(session.user.id),
        _count:{
          select:{
            likes:true,
            comments:true,
          }
        }
      } ,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1, //cantidad de registros que quiero traer
      cursor: cursor ? { id: cursor } : undefined, // a partir de que registro quiero traer los posts
    });

    
    
    
    
    
    const nextCursor = postsForYou.length > pageSize ? postsForYou[pageSize].id : null;
    
    const data: PostsPage = {
      posts: postsForYou.slice(0, pageSize).map(post => ({
        ...post,
        _count: {
          likes: post._count.likes,
          comments: post._count.comments,
        },
      })),
      nextCursor,
    };

    //send posts
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
