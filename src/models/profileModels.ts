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
  url: string;
}
export const createProfile = async (
  connection: any,
  profile: Profile
): Promise<Profile> => {
  try {
    const [result] = await connection.execute(
      "INSERT INTO profile (name, code, emailDomains, contactPerson, contactEmail, contactNumber, url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        profile.name,
        profile.code,
        profile.emailDomains,
        profile.contactPerson,
        profile.contactEmail,
        profile.contactNumber,
        profile.url,
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
    "UPDATE profile SET name =?, code =?, emailDomains =?, contactPerson =?, contactEmail =?, contactNumber =? WHERE id =?",
    [
      profile.name,
      profile.code,
      profile.emailDomains,
      profile.contactPerson,
      profile.contactEmail,
      profile.contactNumber,
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

const sendEmails = async (recipient: string, profile: Profile) => {
  const link = `http://localhost:4200/verifyemail`;
  const message = `Hello ${profile.contactPerson},\n\nYour profile has been created successfully on yatra. Click here to verify the email: ${link}`;

  const params = {
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },
      Subject: { Data: "Profile Created Notification" },
    },
    Source: "your-sender-email@example.com",
  };

  try {
    await ses.sendEmail(params).promise();
    console.log(`Email sent successfully to ${recipient}`);
  } catch (error) {
    console.error(`Error sending email to ${recipient}:`, error);
  }
};
