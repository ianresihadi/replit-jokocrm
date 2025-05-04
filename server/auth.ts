
import { Request, Response, NextFunction } from 'express';

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'adminpassword';
export const JWT_SECRET = 'your-jwt-secret-key';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== JWT_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
}
