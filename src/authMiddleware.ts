import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      auth?: any; 
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.auth = payload; 
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token." });
  }
};
