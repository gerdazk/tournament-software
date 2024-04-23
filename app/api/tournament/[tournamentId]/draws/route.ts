import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }) {
  const body = await req.json()

  const tournamentId = Number(params.tournamentId)

  const prisma = new PrismaClient()

  try {
    const draw = await prisma.draw.create({
      data: {
        tournamentId,
        ...body
      }
    })

    return NextResponse.json({ success: true, draw, status: 201 })
  } catch (error) {
    console.error('Error creating draw:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating draw',
      status: 500
    })
  }
}

export async function DELETE(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')

  const prisma = new PrismaClient()

  try {
    await prisma.draw.delete({
      where: {
        id: Number(id)
      }
    })

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error deleting draw:', error)
    return NextResponse.json({
      success: false,
      error: 'Error deleting draw',
      status: 500
    })
  }
}

export async function GET(req: NextRequest, { params }) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const tournamentId = Number(params.tournamentId)

  const prisma = new PrismaClient()

  try {
    const draws = id
      ? await prisma.draw.findUnique({
          where: {
            id: Number(id)
          },
          include: {
            participants: true,
            matches: true
          }
        })
      : await prisma.draw.findMany({
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
                }
              }
            },
            participants: {
              include: {
                user: true
              }
            }
          }
        })

    return NextResponse.json({ success: true, draws, status: 201 })
  } catch (error) {
    console.error('Error finding draws:', error)
    return NextResponse.json({
      success: false,
      error: 'Error finding draws',
      status: 500
    })
  }
}
