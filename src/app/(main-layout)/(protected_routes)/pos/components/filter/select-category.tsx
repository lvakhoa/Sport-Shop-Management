import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'
const Category = ['Clothing', 'Shoes', 'Accessories', 'Men', 'Women', 'Junior']
export function SelectCategory() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder='Select Category' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Category.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
