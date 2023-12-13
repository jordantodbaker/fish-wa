"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import TutorialStep from "@/components/TutorialStep";

export default function Home() {
  const router = useRouter();

  return (
    <main className=" min-h-screen p-24">
      <div className="text-center">
        <center>
          <Image
            src="/to-the-moon-logo.png"
            alt="home"
            width={300}
            height={300}
          />
        </center>
        <h1 className="align">To The Moon Fishing</h1>
        <h2>
          Get stocking reports sent to your phone the day the day your lake is
          stocked
        </h2>
        <p className="mt-4">
          Subscribe to lakes in your local area. With notifications enabled, you
          can recieve a text or email when those lakes have been stocked.
        </p>
      </div>
      <div className="mt-10 flex flex-row">
        <TutorialStep
          imgSrc="/addLakes.png"
          alt="add lakes"
          title="Add Lakes To Your Subscription"
        >
          Lakes are organized by county. Easily select an entire county of lakes
          or select lakes individually.
        </TutorialStep>
        <TutorialStep
          imgSrc="/stockingReport.png"
          alt="stocking report"
          title="Personalized Stocking Report"
        >
          View a personalized stocking report. We will show you stocking reports
          for the lakes in your subscription. Updated every day!
        </TutorialStep>
        <TutorialStep
          imgSrc="/accountSettings.png"
          alt="account settings"
          title="Get Notifications"
        >
          Opt in to notifications. We will send you a text message and/or email
          as soon as a lake in your subscription has been stocked so you can be
          the first one out on the water.
        </TutorialStep>
      </div>
      <div className="mt-4 flex justify-center">
        <Link href="/api/auth/login">
          <Button color="primary">Login / Create Account</Button>
        </Link>
      </div>
    </main>
  );
}
