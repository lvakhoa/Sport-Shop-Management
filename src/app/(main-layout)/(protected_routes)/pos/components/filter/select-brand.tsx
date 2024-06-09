import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'
const Brand = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Converse', 'Vans']
export function SelectBrand() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select Brand" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Brand.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
