// app/api/users/create.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await req.json(); // Get user data from the request

    // Check if the user already exists
    let existingUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    });

    if (!existingUser) {
      // Create new user and initialize profile
      const newUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName} ${user.lastName}`,
          profile: {
            create: {
              interests: [],
              learningPath: [],
            },
          },
        },
        include: {
          profile: true, // Include profile information in response if needed
        },
      });

      return NextResponse.json({ user: newUser });
    }

    return NextResponse.json({ user: existingUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.error();
  }
}
