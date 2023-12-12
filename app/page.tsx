"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";

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
        <div className="mt-4">
          <Link href="/api/auth/login">
            <Button color="primary">Login / Create Account</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
