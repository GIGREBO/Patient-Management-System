


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "INPUT",
  PHONE_INPUT = "PHONE_INPUT",
  DATE_PICKER = "DATE_PICKER",
  SKELETON = "SKELETON",
  SELECT = "SELECT",
  TEXTAREA = "TEXTAREA",
  CHECKBOX = "CHECKBOX"
}

export const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    onError: (errors) => {
      
    }
  });

  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
  
    try {
      console.log("Attempting to create or fetch user...");
  
      const user = await createUser({ name, email, phone });
  
      if (!user || !user.$id) {
        console.error("User creation or retrieval failed:", user);
        return;
      }
  
      console.log("User found/created:", user);
  
      // Check if user is new or existing
      const isNewUser = user.$createdAt && Date.now() - new Date(user.$createdAt).getTime() < 5000;
  
      const targetRoute = isNewUser 
        ? `/patients/${user.$id}/register` // New user → Registration page
        : `/patients/${user.$id}/new-appointment`; // Existing user → Appointment page
  
      console.log(`Navigating to: ${targetRoute}`);
  
      router.push(targetRoute);
    } catch (error) {
      console.error("An error occurred in onSubmit:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  

  return (
    <Form {...form}>
      <form 
        onSubmit={(e) => {
          
          form.handleSubmit(onSubmit)(e);
        }} 
        className="space-y-6"
      >
        <section className="mb-12 space-y-4">
          <h1 className="text-2xl font-bold">Hi there 👋</h1>
          <p className="text-gray-600">Schedule your first appointment</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email icon"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number (Optional)"
          placeholder="123-456-7890"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg w-full"
        > 
          {isLoading ? "Submitting..." : "Get Started"}
        </Button>
      </form>
    </Form>
  );
};

export default PatientForm;

