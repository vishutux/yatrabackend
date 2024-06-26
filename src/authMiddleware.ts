import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import basicAuth from "basic-auth";
import * as bcrypt from "bcrypt";
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

const validUsername = "gautam@linuxmantra.com";
const validPasswordHash = "$2b$10$EAlXOlfHlcQq6ADYKrtRxuqLxO0Eq33UAXG/eJos0r8Iz9pMsnuU2";

export const authenticateBasic = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const credentials = basicAuth(req);
  if (!credentials || !checkCredentials(credentials.name, credentials.pass)) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    return res.status(401).send("Authentication required.");
  }
  next();
};
const checkCredentials = (username: string, password: string): boolean => {
  return (
    username === validUsername &&
    bcrypt.compareSync(password, validPasswordHash)
  );
};