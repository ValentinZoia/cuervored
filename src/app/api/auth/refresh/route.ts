// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken, verifyToken } from "@/lib/token";
import jwt from "jsonwebtoken";
import { CustomJwtPayload, RefreshTokenRequestBody, RefreshTokenResponse } from "@/types/auth";

export async function POST(req: NextRequest) {
  try {
    const body:RefreshTokenRequestBody = await req.json();
    const { refresh_token } = body;

    // Validar que se proporcionó un refresh token
    if (!refresh_token) {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 400 }
      );
    }

    // Verificar el refresh token
    const decodedToken = verifyToken(refresh_token) as CustomJwtPayload;
    
    if (!decodedToken || typeof decodedToken === 'string' || decodedToken.type !== 'refresh') {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Buscar la cuenta asociada al refresh token
    const account = await prisma.account.findFirst({
      where: {
        refresh_token: refresh_token,
      },
      include: {
        user: true,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 401 }
      );
    }

    // Generar nuevos tokens
    const newAccessToken = generateAccessToken(account.userId);
    const newRefreshToken = generateRefreshToken(account.userId);

    // Calcular la nueva fecha de expiración
    const expiresAt = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hora

    // Actualizar los tokens en la base de datos
    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_at: expiresAt,
      },
    });

    const response: RefreshTokenResponse = {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_at: expiresAt,
      };
      
      return NextResponse.json(response);

  } catch (error) {
    console.error("Error refreshing token:", error);
    
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { error: "Refresh token has expired" },
        { status: 401 }
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Invalid token format" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}