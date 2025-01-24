import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { FollowerInfo } from "@/types/Follower";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
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

    //Check if there is a userId
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    //buscamos el contador de seguidores del usuario(userId). Y si el usuario de la sesión lo sigue.
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
        where:{followerId:session.user.id},
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });

   
    
    

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    
    //Devolvemos la cantidad de seguidores y si el usuario de la sesión sigue al usuario o no.
    const data:FollowerInfo = {
        followers: user._count.followers,
        isFollowedByUser: user.followers.length > 0,
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
  { params: { userId } }: { params: { userId: string } }
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

    //Check if there is a userId
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: session.user.id,
        followingId:userId
      },
      
      
    });

    const followersCount = await prisma.follow.count({
      where: { followingId: userId },
    });
    
    const followingCount = await prisma.follow.count({
      where: { followerId: userId },
    });

    
    
    
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: { following: true, followers: true }
        },
        followers: true,
        following: true,
      },
    });
    
    

    if(!updatedUser){
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    updatedUser._count = {
      followers: followersCount,
      following: followingCount,
    };
    
    
    
   
    
    return NextResponse.json({ followers: updatedUser?._count.followers });


    
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
  { params: { userId } }: { params: { userId: string } }
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

    //Check if there is a userId
    if (!userId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    await prisma.follow.deleteMany({
      where: {
        followerId: session.user.id,
        followingId:userId,
      },
    });

   

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: { followers: true }
        }
      }
    });

    
    return NextResponse.json({ followers: updatedUser?._count.followers });


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
