// app/page.tsx

"use client"; // Mark this component as a Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { useUser, SignInButton } from "@clerk/nextjs";

const Home = () => {
  const { isSignedIn } = useUser(); // Get authentication status
  const router = useRouter(); // Next.js router for redirecting

  // Redirect signed-in users
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard"); // Redirect to the dashboard (adjust route as needed)
    }
  }, [isSignedIn, router]);

  return (
    <>
      {/* Navbar always visible */}

      {/* Main Content Section */}
      <main className="container mx-auto p-6">
        {!isSignedIn ? (
          <section className="text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              Welcome to <span className="text-purple-600">EduMate</span>, Your AI Companion
            </h1>
            <p className="text-lg text-gray-700 mb-6">Experience personalized learning paths and quizzes tailored just for you.</p>
            <p className="text-lg text-gray-700 mb-6">Please sign in to access your full learning experience.</p>
            {/* Sign in button */}
            <div className="mt-6">
              <SignInButton mode="modal">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">Sign In to Get Started</button>
              </SignInButton>
            </div>
          </section>
        ) : (
          <section>
            <p>Redirecting to your dashboard...</p>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t mt-10">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} EduMate. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
