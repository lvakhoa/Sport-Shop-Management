import { useWindowSize } from '@/hooks'
import { actions, PATH_NAME } from '@/configs'
import { default as ActionButton } from '@/components/shared/ActionButton'
import { Label } from './label'
import { Input } from './input'
import { ComboBox } from './ComboBox'
import { GENDER, STATUS } from '@/configs/enum'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { Button } from '@/components/shared/button'
import { useBrowser } from '@/hooks/useBrowser'

const genders: string[] = [GENDER.MALE, GENDER.FEMALE]
const status: string[] = [STATUS.ACTIVE, STATUS.INACTIVE]

const editPersonElement = (
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <Input id="name" value="Pedro Duarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="email" className="text-right">
        Email
      </Label>
      <Input id="email" value="@peduarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="phone" className="text-right">
        Phone
      </Label>
      <Input id="phone" value="@peduarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="gender" className="text-right">
        Gender
      </Label>
      <div className="col-span-3">
        <ComboBox key="gender" placeholder="Gender" items={genders} />
      </div>
    </div>
  </div>
)

const editProductElement = (
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <Input id="name" value="Pedro Duarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="category" className="text-right">
        Category
      </Label>
      <Input id="category" value="Toy" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="buyingPrice" className="text-right">
        B.Price
      </Label>
      <Input id="buyingPrice" value="100.000" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="sellingPrice" className="text-right">
        S.Price
      </Label>
      <Input id="sellingPrice" value="200.000" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="status" className="text-right">
        Status
      </Label>
      <div className="col-span-3">
        <ComboBox key="status" placeholder="Status" items={status} />
      </div>
    </div>
  </div>
)

export function ActionButtonShow({ path, id }: { path: string; id: string }) {
  const width = useWindowSize()
  if (width > 768)
    return (
      <div className="flex gap-[15px]">
        {actions.map((action) => (
          <ActionButton
            key={action.icon}
            background={action.background}
            icon={action.icon}
            alt={action.alt}
            type={action.type}
            id={id}
            path={path}
            editContentElement={path === PATH_NAME.PRODUCT ? editProductElement : editPersonElement}
          />
        ))}
      </div>
    )
  else
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Edit</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex gap-[15px]">
            {actions.map((action) => (
              <ActionButton
                key={action.icon}
                background={action.background}
                icon={action.icon}
                alt={action.alt}
                type={action.type}
                id={id}
                path={path}
                editContentElement={
                  path === PATH_NAME.PRODUCT ? editProductElement : editPersonElement
                }
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
}
