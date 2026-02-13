// src/app/api/send/route.ts
import { EmailTemplate } from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// src/app/api/send/route.ts

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    const data = await resend.emails.send({
      from: 'Queries <pivotal@layoutory.in>', 
      to: ['ullutechp@gmail.com'], 
      
      // ADD THIS LINE: This ensures "Reply" goes to the lead
      replyTo: email, 
      
      subject: `New Inquiry: ${service} - ${name}`,
      react: EmailTemplate({ name, email, phone, service, message }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error });
  }
}