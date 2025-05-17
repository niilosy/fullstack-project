import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany();
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.email) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  try {
    const newInvoice = await prisma.invoice.create({
      data: {
        client: body.client,
        amount: parseFloat(body.amount),
        status: body.status,
        userId: user.id,
      },
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}







