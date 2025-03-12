"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { UserFormValidation } from "@/lib/validation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { GenderOptions } from "@/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {Doctors} from "@/constants/index";
import { Textarea } from "@/components/ui/textarea";
import {IdentificationTypes, PatientFormDefaultValues} from "@/constants/index";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import {FileUploader} from "@/components/ui/fileuploader";
import { PatientFormValidation } from "@/lib/validation";

const RegisterForm = () => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
      birthDate: null,
      gender: "",
      primaryPhysician: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    try {
      setIsLoading(true);
      console.log("Starting submission process");
      
      const patient = {
        userId: params.userId as string,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate).toISOString(),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
        privacyConsent: values.privacyConsent,
      };

      console.log("Submitting patient data:", patient);
      
      try {
        const newPatient = await registerPatient(patient);
        console.log("Registration response:", newPatient);
        
        if (newPatient && newPatient.$id) {
          console.log("Successfully registered patient. Redirecting...");
          await router.push(`/patients/${params.userId}/new-appointment`);
        } else {
          throw new Error("Failed to get patient ID from registration");
        }
      } catch (registrationError) {
        console.error("Registration failed:", registrationError);
        // You could add user feedback here
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        {/* Welcome Section */}
        <section className="space-y-4">
          <h1 className="text-2xl font-bold">Welcome👋</h1>
          <p className="text-gray-600">Tell us more information about yourself</p>
        </section>

        {/* Personal Information */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user icon"
          />
          <div className="flex flex-col gap-6 xl:flex-row">
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
                label="Phone Number"
                placeholder="123-456-7890"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of Birth"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <RadioGroupItem value={option} id={option} />
                        <FormLabel htmlFor={option} className="cursor-pointer">
                          {option}
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="123 West Wacker Drive"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occupation"
                label="Occupation"
                placeholder="Software Engineer"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />
            <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emergencyContactNumber"
                label="Emergency contact number"
                placeholder="123-456-7890"
            />
          </div>
        </section>

        {/* Medical Information */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Primary care physician"
              placeholder="Select a physician"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.label + i} value={doctor.label}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.label}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="None"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="None"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendex removal"
            />
          </div>
        </section>

        {/* Identification Information */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification Information</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>
            
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg w-full"
        > 
          {isLoading ? "Submitting..." : "Submit and Continue"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;