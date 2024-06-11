import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { isRequestBodyValid } from '@/src/utils/isRequestBodyValid'

import { registrationSchema } from './schemas'

const saltRounds = 10

export async function POST(req: NextRequest) {
  const { name, email, password, date_of_birth, proposed_role } =
    await req.json()

  const isBodyValid = isRequestBodyValid({
    schema: registrationSchema,
    body: {
      name,
      email,
      password,
      date_of_birth,
      proposed_role
    }
  })

  if (!isBodyValid) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const prisma = new PrismaClient()

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user',
        date_of_birth,
        proposed_role
      }
    })

    return NextResponse.json({ success: true, user, status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating user',
      status: 500
    })
  }
}
