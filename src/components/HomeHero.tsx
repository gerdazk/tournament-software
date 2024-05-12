'use client'

import { Separator } from '@/components/ui/separator'

export const HomeHero = () => {
  return (
    <div className={`hidden space-y-6 pb-16 pt-8 md:block w-1/2`}>
      <div className="space-y-0.5 flex items-center flex-col">
        <h1 className={`text-3xl font-bold tracking-tight`}>
          Tournament management system
        </h1>
        <p className={` text-muted-foreground`}>
          Manage your tournaments effortlessly
        </p>
      </div>
      <Separator className="w-full" />
    </div>
  )
}
