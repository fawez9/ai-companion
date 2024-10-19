// components/Navbar.tsx
"use client";
import React, { useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export const Navbar = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // Send user data to your API to create the user in the database
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => console.log("User created in DB:", data))
        .catch((err) => console.error("Error creating user in DB:", err));
    }
  }, [user]);

  return (
    <nav className="bg-white shadow">
      <div className="py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">EduMate</h1>
        <div className="space-x-4">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
