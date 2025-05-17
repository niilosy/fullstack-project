import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const invoices = await prisma.invoice.findMany();
  return NextResponse.json(invoices);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const newInvoice = await prisma.invoice.create({
    data: {
      client: body.client,
      amount: parseFloat(body.amount),
      status: body.status,
      userId: user.id,
    },
  });

  return NextResponse.json(newInvoice, { status: 201 });
}


