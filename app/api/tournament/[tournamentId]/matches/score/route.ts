import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { scoringUnits, winnerId, matchId } = await req.json()

    const prisma = new PrismaClient()

    await Promise.all(
      scoringUnits?.map(async ({ id, ...scoringUnit }) => {
        id
          ? await prisma.scoreUnit.update({
              where: {
                id: Number(id)
              },
              data: scoringUnit
            })
          : await prisma.scoreUnit.create({
              data: scoringUnit
            })
      })
    )

    await prisma.match.update({
      where: {
        id: Number(matchId)
      },
      data: {
        winnerId: Number(winnerId)
      }
    })

    return NextResponse.json({ success: true, status: 201 })
  } catch (error) {
    console.error('Error creating score units:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating score units',
      status: 500
    })
  }
}

export async function GET(req: NextRequest, { params }) {
  const searchParams = req.nextUrl.searchParams
  const participants = searchParams.get('participants')
  const normalizedParticipants = participants?.split(',').map(id => Number(id))
  const drawId = searchParams.get('drawId')

  const prisma = new PrismaClient()

  const res = await prisma.match.findFirst({
    where: {
      drawId: Number(drawId),
      participants: {
        every: {
          id: {
            in: normalizedParticipants
          }
        }
      }
    },
    include: {
      ScoreUnit: true
    }
  })

  return NextResponse.json({ success: true, res, status: 201 })
}
