import pool from "../db";
import {
  User,
  createUser as createUserModel,
  getUserByEmail,
  verifyUser,
} from "../models/userModel";
import {
  Profile,
  createProfile as createProfileModel,
  updateProfile as updateProfileModel,
  getAllProfile,
  verifyUrl,
  getSyncedProfile,
} from "../models/profileModels";
import {
  createCorporateUser as corporateUserModel,
  CorporateUser,
  getCorporateUserByCodeModel,
} from "../models/corporateUserModels";

import {
  generateOtps as generateOtpsModel,
  Otp,
  getGeneratedOtp as getGeneratedOtpModel,
  updateOtp as updateOtpModel,
} from "../models/otpModel";

import { sendMail } from "../mail/mailer";


const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(255) NOT NULL,
        emailDomains VARCHAR(255),
        contactPerson VARCHAR(255),
        contactEmail VARCHAR(255),
        generatedUrl VARCHAR(255),
        status BOOLEAN,
        genTs VARCHAR(255),
        contactNumber BIGINT -- Changed to BIGINT,
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS corporateUser (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        code VARCHAR(255),
        mobileNumber BIGINT,
        otp BIGINT,
        status BOOLEAN
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS otp (
        email VARCHAR(255) PRIMARY KEY,
        otp BIGINT
        )
      `);

    console.log("Database tables initialized successfully");
    connection.release();
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initializeDatabase()
  .then(() => {
    console.log("Database initialization complete");
  })
  .catch((error) => {
    console.error("Error initializing database:", error.message);
    process.exit(1);
  });

export const createCorporateUser = async (userData: CorporateUser) => {
  const connection = await pool.getConnection();
  try {
    const user = await corporateUserModel(connection, userData);
    return user;
  } finally {
    connection.release();
  }
};

export const createUser = async (userData: User) => {
  const connection = await pool.getConnection();
  try {
    const user = await createUserModel(connection, userData);
    return user;
  } finally {
    connection.release();
  }
};

export const generateOtp = async (body: Otp) => {
  const connection = await pool.getConnection();
  try {
    var email = body.email;
    var otp = Math.floor(1000 + Math.random() * 9000);
    const otpsData = { email, otp };
    let htmlMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
    </head>
    <body>
        <p>Your OTP is: <strong>${otp}</strong></p>
    </body>
    </html>
    `;
    await sendMail(email, "Email Verification Message", htmlMessage);
    const otps = await generateOtpsModel(connection, otpsData);
    return otps;
  } finally {
    connection.release();
  }
}

export const updateOtp = async (body: Otp) => {
  const connection = await pool.getConnection();
  try {
    var email = body.email;
    var otp = Math.floor(1000 + Math.random() * 9000);
    const otpsData = { email, otp };
    let htmlMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
    </head>
    <body>
        <p>Your OTP is: <strong>${otp}</strong></p>
    </body>
    </html>
    `;
    await sendMail(email, "Email Verification Message", htmlMessage);
    const otps = await updateOtpModel(connection, otpsData);
    return otps;
  } finally {
    connection.release();
  }
}
export const getGeneratedOtpss = async (body: Otp) => {
  const connection = await pool.getConnection();
  try {
    const otps = await getGeneratedOtpModel(connection, body);
    console.log("Generated", otps);
    return otps;
  } finally {
    connection.release();
  }
};

export const getGeneratedOtps = async (body: Otp) => {
  const connection = await pool.getConnection();
  try {
    
    const otps = await getGeneratedOtpModel(connection, body);
    console.log("Generated", otps);
    if(body.otp === otps.otp){
      return true;
    }else{
      return false;
    }
  } finally {
    connection.release();
  }
}
export const getSyncedProfileAndCorporateUser = async (body: any) => {
  const connection = await pool.getConnection();
  try {
    const { code, startDate, endDate } = body;
    const startDateTime = new Date(`${startDate}T00:00:00.000Z`).toISOString();
    console.log(startDateTime);
    const endDateTime = new Date(`${endDate}T23:59:59.999Z`).toISOString();
    console.log(endDateTime);
    const profile = await getSyncedProfile(connection, code, startDateTime, endDateTime);
    console.log(profile);
    return profile;
    
  } finally {
    connection.release();
  }
} 

export const getCorporateUserByCode = async (body: any) => {
  console.log(body);
  const connection = await pool.getConnection();
  try {
    const users = await getCorporateUserByCodeModel(connection, body.code);
    return users;
  } finally {
    connection.release();
  }
}
export const getUser = async (email: string) => {
  const connection = await pool.getConnection();
  try {
    const user = await getUserByEmail(connection, email);
    return user;
  } finally {
    connection.release();
  }
};

export const createProfile = async (profileData: Profile) => {
  const connection = await pool.getConnection();
  try {
    const profile = await createProfileModel(connection, profileData);
    return profile;
  } finally {
    connection.release();
  }
};

export const updateProfile = async (profileData: Profile) => {
  const connection = await pool.getConnection();
  try {
    const profile = await updateProfileModel(connection, profileData);
    return profile;
  } finally {
    connection.release();
  }
};

export const getProfileAll = async (page: any, size: any) => {
  const connection = await pool.getConnection();
  try {
    const profile = await getAllProfile(connection, page, size);
    return profile;
  } finally {
    connection.release();
  }
};

export const verifyUsers = async (email: any, password: any) => {
  const connection = await pool.getConnection();
  try {
    const userverify = await verifyUser(connection, email, password);
    return userverify;
  } finally {
    connection.release();
  }
};

export const checkUrls = async (url: any) => {
  const connection = await pool.getConnection();
  try {
    const checkUrl = await verifyUrl(connection, url);
    return checkUrl;
  } finally {
    connection.release();
  }
};
