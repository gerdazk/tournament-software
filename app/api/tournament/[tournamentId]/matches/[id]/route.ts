import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }) {
  const prisma = new PrismaClient()

  try {
    const match = await prisma.match.findUnique({
      where: {
        id: Number(params.id)
      },
      include: {
        participants: {
          include: {
            user: true
          }
        },
        draw: true,
        ScoreUnit: true
      }
    })

    return NextResponse.json({ success: true, match, status: 201 })
  } catch (error) {
    console.error('Error finding match:', error)
    return NextResponse.json({
      success: false,
      error: 'Error finding match',
      status: 500
    })
  }
}
