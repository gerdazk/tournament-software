const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      date_of_birth: new Date('1990-01-01'),
      role: 'user'
    }
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password',
      date_of_birth: new Date('1992-02-02'),
      role: 'user'
    }
  })

  const user3 = await prisma.user.create({
    data: {
      name: 'Admin Admin',
      email: 'admin@example.com',
      password: 'password',
      date_of_birth: new Date('1995-02-02'),
      role: 'admin'
    }
  })

  const user4 = await prisma.user.create({
    data: {
      name: 'Organizer Laura',
      email: 'organizer@example.com',
      password: 'password',
      date_of_birth: new Date('1993-02-02'),
      role: 'tournamentOrganizer'
    }
  })

  const user5 = await prisma.user.create({
    data: {
      name: 'Staff Adam',
      email: 'staff@example.com',
      password: 'password',
      date_of_birth: new Date('1992-02-02'),
      role: 'staffMember'
    }
  })

  const tournament1 = await prisma.tournament.create({
    data: {
      name: 'Spring Open',
      description: 'A local spring tournament',
      no_of_courts: 5,
      country: 'Lithuania',
      city: 'Vilnius',
      address_name: 'Gedimino pr. 1',
      start_date: new Date('2024-03-01'),
      end_date: new Date('2024-03-05'),
      is_visible: true,
      is_registration_open: true,
      organizer: { connect: { id: user4.id } }
    }
  })

  const tournament2 = await prisma.tournament.create({
    data: {
      name: 'Summer Open',
      description: 'A local summer tournament',
      no_of_courts: 8,
      country: 'Lithuania',
      city: 'Kaunas',
      address_name: 'Laisves pr. 12',
      start_date: new Date('2024-07-01'),
      end_date: new Date('2024-07-05'),
      is_visible: true,
      is_registration_open: true,
      organizer: { connect: { id: user4.id } }
    }
  })

  const tournament3 = await prisma.tournament.create({
    data: {
      name: 'Fall Open',
      description: 'A local fall tournament',
      no_of_courts: 8,
      country: 'Lithuania',
      city: 'Kaunas',
      address_name: 'Laisves pr. 12',
      start_date: new Date('2024-09-01'),
      end_date: new Date('2024-09-05'),
      is_visible: true,
      is_registration_open: false,
      organizer: { connect: { id: user4.id } }
    }
  })

  await prisma.tournamentStaff.create({
    data: {
      tournament: { connect: { id: tournament1.id } },
      staffMembers: {
        connect: [{ id: user5.id }]
      }
    }
  })

  await prisma.participant.create({
    data: {
      user: { connect: { id: user1.id } },
      tournament: { connect: { id: tournament1.id } }
    }
  })

  await prisma.participant.create({
    data: {
      user: { connect: { id: user2.id } },
      tournament: { connect: { id: tournament1.id } }
    }
  })

  await prisma.participant.create({
    data: {
      user: { connect: { id: user1.id } },
      tournament: { connect: { id: tournament2.id } }
    }
  })

  console.log('Seed data inserted successfully')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
