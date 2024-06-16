import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }) {
  const body = await req.json()
  const tournamentId = Number(params.tournamentId)
  const { memberId } = body

  const prisma = new PrismaClient()

  try {
    const staffObject = await prisma.tournamentStaff.findFirst({
      where: {
        tournament: {
          id: Number(tournamentId)
        }
      }
    })

    if (!staffObject) {
      await prisma.tournamentStaff.create({
        data: {
          staffMembers: {
            connect: { id: Number(memberId) }
          },
          tournament: {
            connect: { id: tournamentId }
          }
        }
      })
    } else {
      await prisma.tournamentStaff.update({
        where: {
          id: staffObject.id
        },
        data: {
          staffMembers: {
            connect: { id: Number(memberId) }
          }
        }
      })
    }

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error creating staff member:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating staff member',
      status: 500
    })
  }
}

export async function DELETE(req: NextRequest, { params }) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const tournamentId = Number(params.tournamentId)

  const prisma = new PrismaClient()

  try {
    const staffObject = await prisma.tournamentStaff.findFirst({
      where: {
        tournament: {
          id: Number(tournamentId)
        }
      }
    })

    staffObject &&
      Number(id) &&
      (await prisma.tournamentStaff.update({
        where: {
          id: staffObject.id
        },
        data: {
          staffMembers: {
            disconnect: { id: Number(id) }
          }
        }
      }))

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error deleting staff member:', error)
    return NextResponse.json({
      success: false,
      error: 'Error deleting staff member',
      status: 500
    })
  }
}
