import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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


export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')

  const prisma = new PrismaClient()

  try {
    const tournaments = id ? await prisma.tournament.findUnique({
      where: {
        id: Number(id)
      }
    }) : await prisma.tournament.findMany()

    return NextResponse.json({ success: true, tournaments, status: 201 });

  } catch (error) {
    console.error('Error finding tournaments:', error);
    return NextResponse.json({ success: false, error: 'Error finding tournaments', status: 500 });
  }

}