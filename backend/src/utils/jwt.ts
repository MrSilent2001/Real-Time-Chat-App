import jwt, {JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
} 
