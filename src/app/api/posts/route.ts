import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Post } from "@/types/Post";

export async function GET(req: NextRequest) {
  try {
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