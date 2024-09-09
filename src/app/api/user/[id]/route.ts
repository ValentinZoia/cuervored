import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUserById } from "@/data/user";


export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    
    const {id} = params;

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { name, imageSrc } = body;
    const image = imageSrc;
    
    
   ;
    

    const updatedUser = await prisma.user.update({
      where: { id: id},
      data: { name, image },
    });
    

    
    return NextResponse.json({ message: "User updated successfully" });
  } catch (error: any) {
    //// Código de error específico para violaciones de restricciones únicas
    if(error.code === "P2002"){
      return NextResponse.json({ error: "That username is already in use" }, { status: 409 });

    }
    return NextResponse.json(
        { error: error.message },
        { status: 500 }
    );
}
}




