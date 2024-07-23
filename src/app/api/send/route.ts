import MessageEmailTemplate from '@/components/message-email-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
  try {
    const values = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Carrefour <onboarding@resend.dev>',
      to: 'a_boudjemaa@estin.dz',
      subject: "New contact message from Carrefour website",
      react: MessageEmailTemplate(values) as React.ReactElement,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};