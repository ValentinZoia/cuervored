import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Post } from "@/types/Post";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth(); 
    if(!session){
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const posts: Post[] = await prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
  }
}