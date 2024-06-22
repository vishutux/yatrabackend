import pool from "../db";
import {
  User,
  createUser as createUserModel,
  getUserByEmail,
  verifyUser
} from "../models/userModel";
import { Profile, createProfile as createProfileModel, updateProfile as updateProfileModel, getAllProfile } from "../models/profileModels";

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
        emailDomains VARCHAR(255) NOT NULL,
        contactPerson VARCHAR(255),
        contactEmail VARCHAR(255),
        contactNumber BIGINT -- Changed to BIGINT
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

export const createUser = async (userData: User) => {
  const connection = await pool.getConnection();
  try {
    const user = await createUserModel(connection, userData);
    return user;
  } finally {
    connection.release();
  }
};

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
    try{
        const profile = await createProfileModel(connection, profileData);
        return profile;
    } finally {
        connection.release();
    }
}

export const updateProfile = async (profileData: Profile) => {
  const connection = await pool.getConnection();
  try {
    const profile = await updateProfileModel(connection, profileData);
    return profile;
  } finally {
    connection.release();
  }
}

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
    try{
        const userverify = await verifyUser(connection, email, password);
        return userverify;
    }finally{
        connection.release();
    }
}