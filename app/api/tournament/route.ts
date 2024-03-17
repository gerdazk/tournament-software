import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();

    const prisma = new PrismaClient()

    try {
      const user = await prisma.tournament.create({
        data: {
          ...body
        }
      });

      return NextResponse.json({ success: true, user, status: 201 });

    } catch (error) {
      console.error('Error creating tournament:', error);
      return NextResponse.json({ success: false, error: 'Error creating tournament', status: 500 });
    }

}