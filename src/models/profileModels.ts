export interface Profile {
  id?: number;
  name: string;
  code: string;
  emailDomains: string;
  contactPerson: string;
  contactEmail: string;
  contactNumber: number;
}
export const createProfile = async (
  connection: any,
  profile: Profile
): Promise<Profile> => {
  const [result] = await connection.execute(
    "INSERT INTO profile (name, code, emailDomains, contactPerson, contactEmail, contactNumber) VALUES (?, ?, ?, ?, ?, ?)",
    [
      profile.name,
      profile.code,
      profile.emailDomains,
      profile.contactPerson,
      profile.contactEmail,
      profile.contactNumber,
    ]
  );
  return { ...profile, id: (result as any).insertId };
};

export const getAllProfile = async (
  connection: any,
  page: number = 0,
  size: number = 10
): Promise<Profile[]> => {
  try {
    const offset = page * size;
    const sql = `SELECT * FROM profile LIMIT ${size} OFFSET ${offset}`;
    const [rows] = await connection.execute(sql); 
    return rows as Profile[];
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error; 
  }
};

