"use server";

import * as sdk from "node-appwrite";
import { ID, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";








// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log("New user created:", newuser);
    return parseStringify(newuser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      console.log("Existing user retrieved:", existingUser.users[0]);
      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};









// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    throw error;
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    console.log('Starting patient registration with data:', patient);
    
    // Create patient document without file for now
    const patientData = {
      identificationDocumentId: null,
      identificationDocumentUrl: null,
      ...patient
    };

    console.log('Creating patient document with data:', patientData);
    
    const newPatient = await databases.createDocument(
      DATABASE_ID,
      PATIENT_COLLECTION_ID,
      ID.unique(),
      patientData
    );

    console.log('Patient document created successfully:', newPatient);
    return newPatient;
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
    throw error;
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID,
      PATIENT_COLLECTION_ID,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
    throw error;
  }
};

export type CreateUserParams = {
  email: string;
  phone: string;
  name: string;
};

export type RegisterUserParams = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocument?: FormData;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
};