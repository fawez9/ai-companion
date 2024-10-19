// pages/api/clerk-webhook.ts
import { Webhook } from "svix"; // Svix handles webhooks for Clerk
import { buffer } from "micro";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing (required for svix verification)
  },
};

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const buf = await buffer(req);
  const headers = req.headers as Record<string, string>;
  const wh = new Webhook(webhookSecret);

  let event: { type: string; data: any };

  try {
    event = wh.verify(buf, headers as Record<string, string>) as { type: string; data: any };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return res.status(400).json({ error: `Webhook Error: ${errorMessage}` });
  }

  if (event.type === "user.created") {
    const { id, email_addresses } = event.data;

    // Create a new user in the database using Prisma
    await prisma.user.create({
      data: {
        id,
        email: email_addresses[0].email_address,
        name: null, // Set this if you want to capture the name from Clerk
      },
    });

    return res.status(201).json({ message: "User created in database" });
  }

  res.status(200).json({ received: true });
}
