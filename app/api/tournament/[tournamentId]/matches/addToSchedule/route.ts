import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }) {
  try {
    const body = await req.json()
    const tournamentId = Number(params.tournamentId)

    const { locationId, date, matchId } = body

    const prisma = new PrismaClient()

    let orderOfPlay = await prisma.orderOfPlay.findFirst({
      where: {
        date,
        locationId: Number(locationId)
      }
    })

    if (!orderOfPlay) {
      orderOfPlay = await prisma.orderOfPlay.create({
        data: {
          date,
          Location: {
            connect: { id: Number(locationId) }
          },
          tournament: {
            connect: { id: Number(tournamentId) }
          }
        }
      })
    }

    await prisma.match.update({
      where: { id: Number(matchId) },
      data: {
        startTime: date,
        OrderOfPlay: {
          connect: { id: orderOfPlay.id }
        }
      }
    })

    return NextResponse.json({ success: true, orderOfPlay, status: 201 })
  } catch (error) {
    console.error('Error assigning match to a schedule:', error)
    return NextResponse.json({
      success: false,
      error: 'Error assigning match to a schedule',
      status: 500
    })
  }
}
