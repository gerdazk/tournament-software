import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(_req, { params }) {
  const prisma = new PrismaClient()
  const userId = Number(params.userId)

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      },
      select: {}
    })

    // const participations = await prisma.participant.findMany({
    //     where: {
    //         id: {
    //             in
    //         }
    //     }
    // })

    return NextResponse.json({
      success: true,
      status: 201
    })
  } catch (error) {
    console.error('Error fetching overview:', error)
    return NextResponse.json({
      success: false,
      error: 'Error fetching overview',
      status: 500
    })
  }
}
