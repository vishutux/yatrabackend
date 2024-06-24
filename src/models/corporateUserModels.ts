import bcrypt from "bcrypt";
export interface CorporateUser {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  otp: string;
}

export const createCorporateUser = async (
  connection: any,
  profile: CorporateUser
): Promise<CorporateUser> => {
  try {
    const [result] = await connection.execute(
      "INSERT INTO corporateUser (email, firstName, lastName, otp) VALUES (?, ?, ?, ?)",
      [
        profile.email,
        profile.firstName,
        profile.lastName,
        profile.otp,
      ]
    );
    const insertedProfile = { ...profile, id: (result as any).insertId };
    return insertedProfile;
  } catch (error) {
    console.error("Error creating corporateUser:", error);
    throw error;
  }
};