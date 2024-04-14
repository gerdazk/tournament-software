'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { ModeToggle } from '@/src/components/Navigation/components/ModeToggle'
import { signOut, useSession } from 'next-auth/react'
import { ExitIcon } from '@radix-ui/react-icons'

import { LoginDialog } from '../Dialogs/LoginDialog'
import { RegistrationDialog } from '../Dialogs/RegistrationDialog'

import { UserCard } from './components/UserCard'

export const Navigation = () => {
  const { data } = useSession()
  return (
    <NavigationMenu className="mt-5 flex justify-between w-full max-w-full px-10">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/tournaments" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Tournaments
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Rankings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div>
        {data?.user ? (
          <div className="flex gap-6 items-center">
            <div className="flex gap-3 items-center">
              <UserCard name={data.user?.name || ''} />
              <ExitIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => signOut()}
              />
            </div>
            <ModeToggle />
          </div>
        ) : (
          <div className="flex gap-3">
            <LoginDialog />
            <RegistrationDialog />
            <ModeToggle />
          </div>
        )}
      </div>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
