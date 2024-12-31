import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { categoryApi } from '@/apis'
import { ReactEventHandler } from 'react'

export function SelectCategory({ onValueChange }: { onValueChange: (value: string) => void }) {
  const { data: categories } = useQuery({
    queryKey: queryKeys.allCategories,
    queryFn: () => categoryApi.getAllCategories(),
  })
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder='Select Category' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
