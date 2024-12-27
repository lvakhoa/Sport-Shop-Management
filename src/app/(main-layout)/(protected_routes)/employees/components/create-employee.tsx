import { Button, ComboBox, DatePicker, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GENDER } from '@/configs/enum'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeeApi } from '@/apis'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'
import { IEmployeeRequest } from '@/interfaces/employee'
import { toast } from 'react-toastify'

const employeeSchema = z.object({
  fullname: z.string(),
  phone: z.string(),
  email: z.string(),
  gender: z.nativeEnum(GENDER),
  group_user_id: z.string(),
})

const employeeGroupUser = [
  {
    id: 'posStaff',
    title: 'POS Staff',
  },
  {
    id: 'manager',
    title: 'Manager',
  },
] // dummy data

export default function CreateEmployeeForm() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
  })

  const { mutate: createEmployee } = useMutation({
    mutationFn: (data: IEmployeeRequest) =>
      employeeApi.createEmployee({
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        group_user_id: data.group_user_id,
      }),
    onSuccess: () => {
      toast.success('Employee created successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'employees' })
    },
  })

  function onSubmit(data: z.infer<typeof employeeSchema>) {
    createEmployee({
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      group_user_id: data.group_user_id,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='fullname' className='text-left'>
                    Name
                  </Label>
                  <Input id='fullname' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='phone' className='text-left'>
                    Phone
                  </Label>
                  <Input id='phone' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='email' className='text-left'>
                    Email
                  </Label>
                  <Input id='email' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='gender' className='text-left'>
                    Gender
                  </Label>
                  <div className='col-span-3'>
                    <ComboBox
                      key='gender'
                      placeholder='Gender'
                      items={Object.values(GENDER)}
                      onValueChange={field.onChange}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='group_user_id'
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value === null ? undefined : field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='account_id' className='text-left'>
                      User Group
                    </Label>
                    <SelectTrigger className='col-span-3'>
                      <SelectValue
                        placeholder={<span className='text-muted-foreground'>User Group</span>}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {employeeGroupUser.map((item) => {
                          return (
                            <SelectItem key={item.id} value={item.id}>
                              {item.title}
                            </SelectItem>
                          )
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </div>
                </FormControl>
                <FormMessage className='text-[14px] font-normal' />
              </Select>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
        >
          Add Employee
        </Button>
      </form>
    </Form>
  )
}
