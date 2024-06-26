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
): Promise<any> => {
  try {
    const queryq = `SELECT *
      FROM profile
      WHERE code = '${profile.code}'`;
    const [getProfile] = await connection.execute(queryq);
    console.log("getProfiel  is  ", getProfile[0]);
    const domains = getProfile[0].emailDomains;
    const email = profile.email.split("@")[1];
    console.log("domain is  ", domains)
    console.log("email is ", email);
    const domainList = domains.split(",");
    const isAllowed = isEmailAllowed(email, domainList);
    if (isAllowed) {
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
          true,
          genDate,
        ]
      );
      const insertedProfile = { ...profile, id: (result as any).insertId };
      console.log("inserted profile ", insertedProfile);
      return insertedProfile;
    } else {
      const result = { message: "domain not found" };
      return result;
    }
  } catch (error) {
    console.error("Error creating corporateUser:", error);
    throw error;
  }
};
const isEmailAllowed = (emailDomain: any, allowedDomains: any) => {
  return allowedDomains.some((domain:any) => domain.trim() === emailDomain);
};
export const getCorporateUserByCodeModel = async (
  connection: any,
  code: any
): Promise<CorporateUser> => {
  console.log(code);
  try {
    const [result] = await connection.execute(
      "SELECT * FROM corporateUser WHERE code =?",
      [code]
    );
    return result;
  } catch (error) {
    console.error("Error creating corporateUser:", error);
    throw error;
  }
};
