import { isRequestBodyValid } from '@/src/utils/isRequestBodyValid'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { bodySchema } from './schemas'

export async function DELETE(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get('id')

  const prisma = new PrismaClient()

  try {
    await prisma.location.delete({
      where: {
        id: Number(id)
      }
    })

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error deleting location:', error)
    return NextResponse.json({
      success: false,
      error: 'Error deleting location',
      status: 500
    })
  }
}

export async function POST(req: NextRequest, { params }) {
  const body = await req.json()
  const tournamentId = Number(params.tournamentId)

  const isBodyValid = isRequestBodyValid({
    schema: bodySchema,
    body
  })

  if (!isBodyValid) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const prisma = new PrismaClient()

  try {
    await prisma.location.create({
      data: {
        ...body,
        tournamentId: Number(tournamentId)
      }
    })

    return NextResponse.json({ success: true, status: 200 })
  } catch (error) {
    console.error('Error creating location:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating location',
      status: 500
    })
  }
}

export async function GET(req: NextRequest, { params }) {
  const tournamentId = Number(params.tournamentId)

  const prisma = new PrismaClient()

  try {
    const locations = await prisma.location.findMany({
      where: {
        tournamentId
      }
    })

    return NextResponse.json({ success: true, locations, status: 201 })
  } catch (error) {
    console.error('Error finding locations:', error)
    return NextResponse.json({
      success: false,
      error: 'Error finding locations',
      status: 500
    })
  }
}
