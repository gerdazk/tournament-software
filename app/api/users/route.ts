import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')
  const prisma = new PrismaClient()

  try {
    const users = id
      ? await prisma.user.findUnique({
          where: {
            id: Number(id)
          },
          include: {
            participant: {
              include: {
                tournament: true
              }
            }
          }
        })
      : await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            proposed_role: true,
            date_of_birth: true,
            tournaments: true
          }
        })

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('Error finding users:', error)
    return NextResponse.json(
      { success: false, error: 'Error finding users' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')
  const prisma = new PrismaClient()
  const { isApproved, role } = await req.json()

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Please provide user id' },
      { status: 400 }
    )
  }

  try {
    const users = isApproved
      ? await prisma.user.update({
          where: {
            id
          },
          data: {
            role,
            proposed_role: ''
          }
        })
      : await prisma.user.update({
          where: {
            id
          },
          data: {
            proposed_role: ''
          }
        })

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('Error finding users:', error)
    return NextResponse.json(
      { success: false, error: 'Error finding users' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')
  const prisma = new PrismaClient()
  const body = await req.json()

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Please provide user id' },
      { status: 400 }
    )
  }

  try {
    const users = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: body
    })

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('Error updating user data:', error)
    return NextResponse.json(
      { success: false, error: 'Error updating user data' },
      { status: 500 }
    )
  }
}
