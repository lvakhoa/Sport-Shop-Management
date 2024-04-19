import { useWindowSize } from '@/hooks'
import { actions } from '@/configs'
import { default as ActionButton } from '@/components/shared/ActionButton'
import { Label } from './label'
import { Input } from './input'
import { ComboBox } from './ComboBox'
import { GENDER } from '@/configs/enum'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { Button } from '@/components/shared/button'
import { useBrowser } from '@/hooks/useBrowser'

const genders: string[] = [GENDER.MALE, GENDER.FEMALE]

const editContentElement = (
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

export function ActionButtonShow() {
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
            id="1"
            editContentElement={editContentElement}
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
                id="1"
                editContentElement={editContentElement}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
}
