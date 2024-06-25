import AWS from "aws-sdk";
const ses = new AWS.SES({ apiVersion: "2010-12-01" });
export interface Profile {
  id?: number;
  name: string;
  code: string;
  emailDomains: string;
  contactPerson: string;
  contactEmail: string;
  contactNumber: number;
  generatedUrl: string;
  status: boolean;
  genTs: string;
}
export const createProfile = async (
  connection: any,
  profile: Profile
): Promise<Profile> => {
  try {
    const genDate = new Date().toISOString();
    const [result] = await connection.execute(
      "INSERT INTO profile (name, code, emailDomains, contactPerson, contactEmail, contactNumber, generatedUrl, genTs, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        profile.name,
        profile.code,
        profile.emailDomains,
        profile.contactPerson,
        profile.contactEmail,
        profile.contactNumber,
        profile.generatedUrl,
        genDate,
        false
      ]
    );
    const insertedProfile = { ...profile, id: (result as any).insertId };
    // sendEmails(profile.contactEmail, insertedProfile);
    return insertedProfile;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

export const updateProfile = async (
  connection: any,
  profile: Profile
): Promise<Profile> => {
  const [result] = await connection.execute(
    "UPDATE profile SET name =?, code =?, emailDomains =?, contactPerson =?, contactEmail =?, contactNumber =?, status =? WHERE id =?",
    [
      profile.name,
      profile.code,
      profile.emailDomains,
      profile.contactPerson,
      profile.contactEmail,
      profile.contactNumber,
      profile.status,
      profile.id,
    ]
  );
  return {
    ...profile,
    id: (result as any).insertId,
  };
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

export const verifyUrl = async (connection: any, url: string): Promise<Profile[]> => {
  const [rows] = await connection.execute(
    "SELECT * FROM profile WHERE code =?",
    [url]
  );
  return rows.length > 0 ? rows : null;
};

export const getSyncedProfile = async(connection: any, code: any, startDate: any, endDate: any): Promise<any> => {
  const query = `
      SELECT *
      FROM profile
      WHERE genTs >= ? AND genTs <= ?
    `;
  const query1 = `SELECT * FROM corporateUser WHERE code = ?`;
   const [rows] = await connection.execute(query, [startDate, endDate]);
   const [rows1] = await connection.execute(query1, [code]);
   const profile = (rows as any[]).filter(
     (row: any) => row.code === code
   );
   console.log("filtered result is ", profile);
   console.log(rows1);
   const corporateUsers = rows1
   return { profile, corporateUsers };
}
