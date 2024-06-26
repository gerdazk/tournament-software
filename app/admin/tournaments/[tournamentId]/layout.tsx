'use client'
import { Separator } from '@/components/ui/separator'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { SidebarNav } from '../../components/SideBarNav'

import { isUserAllowedToEnter } from './utils/isUserAllowedToEnter'

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({
  children,
  params
}: SettingsLayoutProps) {
  const tournamentId = params?.tournamentId
  const { data } = useSession()
  const [isAllowed, setAllowed] = useState(false)

  const setAllowance = async () => {
    const isAllowedToEnter = await isUserAllowedToEnter({
      userId: data?.user?.id,
      tournamentId: params.tournamentId
    })
    setAllowed(!!isAllowedToEnter)
  }

  useEffect(() => {
    setAllowance()
  }, [])

  const sidebarNavItems = [
    {
      title: 'General info',
      href: `/admin/tournaments/${tournamentId}/general`
    },
    {
      title: 'Locations',
      href: `/admin/tournaments/${tournamentId}/locations`
    },
    {
      title: 'Tournament staff',
      href: `/admin/tournaments/${tournamentId}/staff`
    },
    {
      title: 'Players',
      href: `/admin/tournaments/${tournamentId}/players`
    },
    {
      title: 'Draws',
      href: `/admin/tournaments/${tournamentId}/draws`
    },
    {
      title: 'Matches',
      href: `/admin/tournaments/${tournamentId}/matches`
    },
    {
      title: 'Order of play',
      href: `/admin/tournaments/${tournamentId}/schedule`
    },
    {
      title: 'Tournament results',
      href: `/admin/tournaments/${tournamentId}/results`
    }
  ]

  return (
    <>
      <div className="space-y-6 py-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Tournament</h2>
          <p className="text-muted-foreground">Manage your tournament.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {isAllowed
              ? children
              : 'You do not have access rights to this tournament.'}
          </div>
        </div>
      </div>
    </>
  )
}
