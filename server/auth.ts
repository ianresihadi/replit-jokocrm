
import { Request, Response, NextFunction } from "express";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123"; // Change this in production
const JWT_SECRET = "your-jwt-secret"; // Change this in production

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  
  try {
    // Simple token validation (improve in production)
    if (token !== JWT_SECRET) {
      throw new Error("Invalid token");
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET };
