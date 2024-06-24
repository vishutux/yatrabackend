export interface Otp {
  email: string;
  otp: number;
}
export const generateOtps = async (connection: any, profile: Otp): Promise<Otp> => {
  try {
    const [result] = await connection.execute(
      "INSERT INTO otp (email, otp) VALUES (?, ?)",
      [
        profile.email,
        profile.otp,
      ]
    );
    const insertedProfile = { ...profile, result };
    return insertedProfile;
  } catch (error) {
    console.error("Error creating corporateUser:", error);
    throw error;
  }
};

export const updateOtp = async (connection: any, profile: Otp): Promise<Otp> => { 
  console.log("profie", profile);
  try {
    const [result] = await connection.execute(
      "UPDATE otp SET otp =? WHERE email =?",
      [
        profile.otp,
        profile.email,
      ]
    );
    const insertedProfile = { ...profile, result };
    return insertedProfile;
  } catch (error) {
    console.error("Error creating corporateUser:", error);
    throw error;
  }
};

export const getGeneratedOtp = async (connection: any, body: Otp): Promise<Otp> => {
  console.log("otpssssss", body);
  try {
    const [result] = await connection.execute(
      "SELECT * FROM otp WHERE email =?",
      [
        body.email,
      ]
    );
    return result[0];
  } catch (error) {
    console.error("Error getting otp:", error);
    throw error;
  }
}