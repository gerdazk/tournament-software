import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }) {
  const body = await req.json()

  const prisma = new PrismaClient()

  try {
    body.map(async ({ drawId, participants }) => {
      const draw = await prisma.match.create({
        data: {
          drawId
        }
      })

      draw?.id &&
        (await prisma.match.update({
          where: {
            id: draw.id
          },
          data: {
            participants
          }
        }))
    })

    body[0].drawId &&
      (await prisma.draw.update({
        where: {
          id: body[0].drawId
        },
        data: {
          isPublished: true
        }
      }))

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error creating matches:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating matches',
      status: 500
    })
  }
}

export async function GET(req: NextRequest, { params }) {
  const tournamentId = Number(params.tournamentId)

  const prisma = new PrismaClient()

  try {
    const allMatches: any[] = []
    const draws = await prisma.draw.findMany({
      where: {
        tournamentId
      },
      include: {
        matches: {
          include: {
            participants: {
              include: {
                user: true
              }
            },
            draw: true
          }
        }
      }
    })

    draws.map(({ matches }) => allMatches.push(...matches))

    return NextResponse.json({ success: true, allMatches, status: 201 })
  } catch (error) {
    console.error('Error finding matches:', error)
    return NextResponse.json({
      success: false,
      error: 'Error finding matches',
      status: 500
    })
  }
}
