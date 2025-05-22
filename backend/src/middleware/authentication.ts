import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../model/user.model';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized - missing authorization header' });
      return;
    }

    //extract token
    const token = authHeader.split(' ')[1];

    //verify token
    const decoded = verifyToken(token);

    (req as any).user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
