import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// export async function DELETE(req: NextRequest) {
//   const params = req.nextUrl.searchParams
//   const id = params.get('id')

//   const prisma = new PrismaClient()

//   try {
//     await prisma.location.delete({
//       where: {
//         id: Number(id)
//       }
//     })

//     return NextResponse.json({ success: true, status: 200 })
//   } catch (error) {
//     console.error('Error deleting location:', error)
//     return NextResponse.json({
//       success: false,
//       error: 'Error deleting location',
//       status: 500
//     })
//   }
// }

export async function POST(req: NextRequest, { params }) {
  const body = await req.json()
  const tournamentId = Number(params.tournamentId)

  const prisma = new PrismaClient()

  const { locationId, ...restBody } = body

  try {
    await prisma.orderOfPlay.create({
      data: {
        ...restBody,
        locationId: Number(locationId),
        tournamentId: Number(tournamentId)
      }
    })

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error creating schedule:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating schedule',
      status: 500
    })
  }
}

export async function GET(req: NextRequest, { params }) {
  const tournamentId = Number(params.tournamentId)

  const prisma = new PrismaClient()

  try {
    const schedules = await prisma.orderOfPlay.findMany({
      where: {
        tournamentId
      },
      include: {
        Location: true,
        matches: {
          include: {
            participants: {
              include: {
                user: true
              }
            },
            OrderOfPlay: {
              include: {
                Location: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ success: true, schedules, status: 201 })
  } catch (error) {
    console.error('Error finding schedules:', error)
    return NextResponse.json({
      success: false,
      error: 'Error finding schedules',
      status: 500
    })
  }
}
