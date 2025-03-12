"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import { Appointment } from "@/types/appwrite.types";
import twilio from 'twilio';
import messaging from "../appwrite.config";
import {users} from "@/lib/appwrite.config"
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

const accountSid =  'ACd16db34ccfcf0c438fe486425ae40b86';
const authToken = 'b9e8dc8b03d98ac0436ed6d5e86a88c1'; 



//  CREATE APPOINTMENT
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    // const scheduledAppointments = (
    //   appointments.documents as Appointment[]
    // ).filter((appointment) => appointment.status === "scheduled");

    // const pendingAppointments = (
    //   appointments.documents as Appointment[]
    // ).filter((appointment) => appointment.status === "pending");

    // const cancelledAppointments = (
    //   appointments.documents as Appointment[]
    // ).filter((appointment) => appointment.status === "cancelled");

    // const data = {
    //   totalCount: appointments.total,
    //   scheduledCount: scheduledAppointments.length,
    //   pendingCount: pendingAppointments.length,
    //   cancelledCount: cancelledAppointments.length,
    //   documents: appointments.documents,
    // };

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "Scheduled":
            acc.scheduledCount++;
            break;
          case "Pending":
            acc.pendingCount++;
            break;
          case "Cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};
const twilioClient = twilio(accountSid, authToken);
//  SEND SMS NOTIFICATION

export const sendSMSNotification = async (phoneNumber: string, content: string) => {
  try {
    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

    console.log('Formatted Phone Number:', formattedPhoneNumber);
    const twilioPhoneNumber = '+18449633824'
    const message = await twilioClient.messages.create({
      body: content,
      to: formattedPhoneNumber,          // Must be a valid phone number
      from: twilioPhoneNumber,  // Replace with your Twilio number
    });

    console.log('SMS sent:', message.sid);
    return message;
  } catch (error) {
    console.error('An error occurred while sending SMS:', error);
  }
};
//  UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    // Update the appointment
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw new Error("Appointment update failed");

    // Fetch the user's details using their userId
    const user = await users.get(userId);
    
    // Access the user's phone number
    const phoneNumber = user.phone || user.prefs.phone;

    if (!phoneNumber) {
      console.error("User does not have a phone number on file.");
      return;
    }

    // Prepare the SMS message
    const smsMessage = `[CarePulse] Greetings from CarePulse. ${
      type === "schedule"
        ? `Your appointment is confirmed for ${formatDateTime(
            appointment.schedule!,
            timeZone
          ).dateTime} with Dr. ${appointment.primaryPhysician}.`
        : `We regret to inform you that your appointment for ${formatDateTime(
            appointment.schedule!,
            timeZone
          ).dateTime} is cancelled. Reason: ${appointment.cancellationReason}.`
    } Reply STOP to unsubscribe.`;
    

    // Send the SMS notification using the phone number
    await sendSMSNotification(phoneNumber, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};


// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};