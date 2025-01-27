// types/auth.ts
import { JwtPayload } from 'jsonwebtoken';

export interface RefreshTokenRequestBody {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  type: 'access' | 'refresh';
}