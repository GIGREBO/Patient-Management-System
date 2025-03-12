"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/ui/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

interface RegisterPageProps {
  params: {
    userId: string;
  };
}

export default function RegisterPage({ params }: RegisterPageProps) {
  // Move the getUser call into an effect or the form component
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="CarePulse Logo"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm />

          <div className="text-14-regular-mt-20 flex justify-between">
            <p className="copyright py-12">
              © 2024 CarePulse
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1080}
        width={1920}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
}