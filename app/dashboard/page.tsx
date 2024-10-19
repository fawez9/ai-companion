// app/dashboard/page.tsx

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ChatButton } from "@/components/ChatButton";

const Dashboard = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the sign-in page if the user is not signed in
    if (!isSignedIn) {
      router.push("/"); // Change this to your sign-in page path
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    // Optionally, render a loading state while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <ChatButton />
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
