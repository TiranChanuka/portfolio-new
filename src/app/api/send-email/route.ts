import { NextResponse } from "next/server";
import { z } from "zod";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY || "",
});

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormData = z.infer<typeof formSchema>;

// API route handler for POST requests
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate the input data first
    const validatedData = formSchema.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, message: "Invalid form data" },
        { status: 400 }
      );
    }

    // Send the email
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID || "",
      process.env.EMAILJS_TEMPLATE_ID || "",
      {
        from_name: validatedData.data.name,
        from_email: validatedData.data.email,
        subject: validatedData.data.subject,
        message: validatedData.data.message,
        to_email: "tiranchanukaw@gmail.com",
      }
    );

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Failed to send email:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Helper function for client component to use
export async function sendContactEmail(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
