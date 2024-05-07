import * as React from 'react'
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import MultipleSelector from '@/components/ui/multiple-selector'

const OPTIONS = [
  { label: 'nextjs', value: 'Nextjs' },
  { label: 'React', value: 'react' },
  { label: 'Remix', value: 'remix' },
  { label: 'Vite', value: 'vite' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Ember', value: 'ember' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Astro', value: 'astro' }
]

type Props = {
  control: any
  description: string
  label: string

  name: string
  placeholder?: string
  items: {
    text: string
    value: string
  }[]
}

export const MultipleSelectField = ({
  control,
  description,
  label,
  name
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <MultipleSelector
            value={field.value}
            onChange={field.onChange}
            defaultOptions={OPTIONS}
            placeholder="Select frameworks you like..."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          />
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
