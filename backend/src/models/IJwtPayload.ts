import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}
