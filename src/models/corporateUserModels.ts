import bcrypt from "bcrypt";
export interface CorporateUser {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  code: string;
  mobileNumber: number;
  otp: number;
  genTs: string;
  status: boolean;
}

export const createCorporateUser = async (
  connection: any,
  profile: CorporateUser
): Promise<CorporateUser> => {
  try {
    const genDate = new Date().toISOString();
    const [result] = await connection.execute(
      "INSERT INTO corporateUser (email, firstName, lastName, code, mobileNumber, otp, status, genTs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        profile.email,
        profile.firstName,
        profile.lastName,
        profile.code,
        profile.mobileNumber,
        profile.otp,
        false,
        genDate,
      ]
    );
    const insertedProfile = { ...profile, id: (result as any).insertId };
    return insertedProfile;
  } catch (error) {
    console.error("Error creating corporateUser:", error);
    throw error;
  }
};
export const getCorporateUserByCodeModel = async (connection: any,  code: any
): Promise<CorporateUser> => {
  console.log(code);
  try {
    const [result] = await connection.execute(
      "SELECT * FROM corporateUser WHERE code =?",
      [
        code
      ]
    );
    return result; 
  } catch (error) {
    console.error("Error creating corporateUser:", error);
    throw error;
  }
}