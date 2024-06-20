import { useWindowSize } from '@/hooks'
import { actions, PATH_NAME } from '@/configs'
import { Label } from './label'
import { Input } from './input'
import ComboBox from './ComboBox'
import { Button } from './button'
import ActionButton from './ActionButton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { GENDER, STATUS } from '@/configs/enum'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function ActionButtonShow({
  path,
  id,
  editContentElement,
  tableKey,
  deleteMethod,
}: {
  path: string
  id: string
  editContentElement?: React.ReactElement
  tableKey: string
  deleteMethod: () => Promise<string | undefined>
}) {
  const queryClient = useQueryClient()

  const { mutate: deleteData } = useMutation({
    mutationFn: deleteMethod,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === tableKey,
      })
    },
  })

  const width = useWindowSize()
  if (width > 768)
    return (
      <div className='flex gap-[15px]'>
        {actions.map((action) => (
          <ActionButton
            key={action.icon}
            background={action.background}
            icon={action.icon}
            alt={action.alt}
            type={action.type}
            id={id}
            path={path}
            editContentElement={editContentElement}
            deleteMethod={deleteData}
          />
        ))}
      </div>
    )
  else
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>Action</Button>
        </PopoverTrigger>
        <PopoverContent className='w-max p-5'>
          <div className='flex gap-[15px]'>
            {actions.map((action) => (
              <ActionButton
                key={action.icon}
                background={action.background}
                icon={action.icon}
                alt={action.alt}
                type={action.type}
                id={id}
                path={path}
                editContentElement={editContentElement}
                deleteMethod={deleteData}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
}
