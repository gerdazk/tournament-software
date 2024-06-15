import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')

  const prisma = new PrismaClient()

  try {
    const tournaments = await prisma.tournament.findMany({
      where: {
        organizerId: Number(id)
      }
    })

    console.log({ tournaments })

    return NextResponse.json({ success: true, tournaments, status: 201 })
  } catch (error) {
    console.error('Error finding tournaments:', error)
    return NextResponse.json({
      success: false,
      error: 'Error finding tournaments',
      status: 500
    })
  }
}
