import { isRequestBodyValid } from '@/src/utils/isRequestBodyValid'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { tournamentSchema } from './schemas'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const prisma = new PrismaClient()

  const isBodyValid = isRequestBodyValid({
    schema: tournamentSchema,
    body
  })

  if (!isBodyValid) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  try {
    const user = await prisma.tournament.create({
      data: {
        ...body
      }
    })

    return NextResponse.json({ success: true, user, status: 201 })
  } catch (error) {
    console.error('Error creating tournament:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating tournament',
      status: 500
    })
  }
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')
  const isArchive = !!params.get('isArchive') || false

  const prisma = new PrismaClient()

  try {
    const tournaments = id
      ? await prisma.tournament.findUnique({
          where: {
            id: Number(id)
          },
          include: {
            participants: {
              include: {
                user: true,
                Draw: true
              }
            },
            Location: true,
            tournamentStaff: {
              include: {
                staffMembers: true
              }
            }
          }
        })
      : await prisma.tournament.findMany({
          where: {
            is_visible: true,
            start_date: {
              gte: !isArchive ? new Date() : new Date('1990-01-01')
            },
            end_date: {
              lte: isArchive ? new Date() : new Date('3000-01-01')
            }
          }
        })

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

export async function DELETE(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')

  const prisma = new PrismaClient()

  try {
    await prisma.tournament.delete({
      where: {
        id: Number(id)
      }
    })

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error deleting tournament:', error)
    return NextResponse.json({
      success: false,
      error: 'Error deleting tournament',
      status: 500
    })
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()

  const isBodyValid = isRequestBodyValid({
    schema: tournamentSchema,
    body
  })

  if (!isBodyValid) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const prisma = new PrismaClient()

  try {
    const user = await prisma.tournament.update({
      where: {
        id: body.id
      },
      data: {
        ...body
      }
    })

    return NextResponse.json({ success: true, user, status: 201 })
  } catch (error) {
    console.error('Error editing tournament:', error)
    return NextResponse.json({
      success: false,
      error: 'Error editing tournament',
      status: 500
    })
  }
}
