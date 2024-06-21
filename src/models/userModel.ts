import bcrypt from "bcrypt";
export interface User {
  id?: number;
  email: string;
  password: string;
}

export const getUserByEmail = async (
  connection: any,
  email: string
): Promise<User | null> => {
  const [rows] = await connection.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows.length > 0 ? (rows[0] as User) : null;
};

export const createUser = async (
  connection: any,
  user: User
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const [result] = await connection.execute(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [user.email, hashedPassword]
  );
  return { ...user, id: (result as any).insertId };
};

export const verifyUser = async (
  connection: any,
  email: string,
  password: string
): Promise<boolean> => {
  const [rows] = await connection.execute(
    "SELECT password FROM users WHERE email = ?",
    [email]
  );
  if (rows.length === 0) return false; 
  const user = rows[0];
  return bcrypt.compare(password, user.password); 
};
