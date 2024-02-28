import * as React from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from "@/components/ui/select"

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

export const SelectField = ({control, description, label, name, placeholder, items}: Props) => {
    return (
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder || ''} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {
                    items?.length && items.map(({value, text}) => <SelectItem value={value} key={value}>{text}</SelectItem>)
                }
              </SelectContent>
            </Select>
            <FormDescription>
                {description}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    )
}