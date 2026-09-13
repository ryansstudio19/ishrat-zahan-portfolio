import { db } from "./index.ts";
import { inquiries } from "./schema.ts";

export async function createInquiry(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const result = await db.insert(inquiries).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("Failed to insert inquiry:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function getInquiries() {
  try {
    return await db.select().from(inquiries);
  } catch (error) {
    console.error("Failed to get inquiries:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}
