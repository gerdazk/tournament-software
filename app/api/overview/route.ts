import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const prisma = new PrismaClient()

  try {
    const tournamentsCount = await prisma.tournament.count()
    const matchesCount = await prisma.match.count()
    const usersCount = await prisma.user.count()
    const organizersCount = await prisma.user.count({
      where: {
        role: 'tournamentOrganizer'
      }
    })

    return NextResponse.json({
      success: true,
      data: { tournamentsCount, matchesCount, usersCount, organizersCount },
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
