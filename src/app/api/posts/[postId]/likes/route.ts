import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { LikeInfo } from "@/types/Post";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    // Check if the user is authenticated
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

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        likes: {
        
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    
    

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    const userLikePost = post?.likes.some(like => like.userId === session.user.id);

    const data: LikeInfo = {
      likes: post.likes.length,
      isLikedByUser: userLikePost as boolean,
    };

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

export async function POST(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    // Check if the user is authenticated
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

    const like = await prisma.like.create({
      data: {
        userId: session.user.id,
        postId
      }
    });

    const updatedPost = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        _count: {
          select: { likes: true }
        }
      }
    });

    
    return NextResponse.json({ likes: updatedPost?._count.likes });


    
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

export async function DELETE(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    // Check if the user is authenticated
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

    await prisma.like.deleteMany({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    await prisma.like.deleteMany({
      where: {
        userId: session.user.id,
        postId
      }
    });

    const updatedPost = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        _count: {
          select: { likes: true }
        }
      }
    });

    console.log("DELETE", updatedPost?._count.likes)
    return NextResponse.json({ likes: updatedPost?._count.likes });


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
