import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }) {
  const { userId } = await req.json()
  const tournamentId = Number(params.tournamentId)

  const prisma = new PrismaClient()

  try {
    const user = await prisma.participant.create({
      data: {
        userId: Number(userId),
        tournamentId
      }
    })

    return NextResponse.json({ success: true, user, status: 201 })
  } catch (error) {
    console.error('Error creating participant:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating participant',
      status: 500
    })
  }
}

export async function DELETE(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')

  const prisma = new PrismaClient()

  try {
    await prisma.participant.delete({
      where: {
        id: Number(id)
      }
    })

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error deleting participant:', error)
    return NextResponse.json({
      success: false,
      error: 'Error deleting participant',
      status: 500
    })
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()

  const prisma = new PrismaClient()

  try {
    Promise.all(
      body.map(
        async ({ id, ...rest }) =>
          await prisma.participant.update({
            where: {
              id
            },
            data: rest
          })
      )
    )

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error updating participants:', error)
    return NextResponse.json({
      success: false,
      error: 'Error updating participants',
      status: 500
    })
  }
}
