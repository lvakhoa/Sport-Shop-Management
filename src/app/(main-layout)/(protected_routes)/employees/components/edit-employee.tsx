import { Button, ComboBox, DatePicker, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import moment from 'moment'
import { GENDER } from '@/configs/enum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { employeeAccountApi, employeeApi, positionApi } from '@/apis'
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
import { useEffect } from 'react'

const gender: string[] = ['MALE', 'FEMALE']

const employeeSchema = z.object({
  account_id: z.string().optional(),
  position_id: z.string().optional(),
  fullname: z.string({
    message: 'Name is required',
  }),
  phone: z.string({
    message: 'Phone number is required',
  }),
  email: z
    .string({
      message: 'Email is required',
    })
    .email({
      message: 'Please enter a valid email address',
    }),
  gender: z.enum(['MALE', 'FEMALE'], { message: 'Gender is required' }).default('MALE'),
  started_date: z
    .string({
      message: 'Started date is required',
    })
    .datetime(),
  salary: z.number({
    message: 'Salary is required',
  }),
})

export default function EditEmployeeForm({ employeeId }: { employeeId: string }) {
  const queryClient = useQueryClient()
  const { data: employee } = useQuery({
    queryKey: queryKeys.employeeDetails.gen(employeeId),
    queryFn: () => employeeApi.getEmployeesById(employeeId),
  })
  const { data: accounts } = useQuery({
    queryKey: queryKeys.employeeAccount,
    queryFn: () => employeeAccountApi.getAllEmployeeAccounts(),
  })
  const { data: positions } = useQuery({
    queryKey: queryKeys.positions,
    queryFn: () => positionApi.getAllPositions(),
  })

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      fullname: '',
      phone: '',
      email: '',
      gender: 'MALE',
      started_date: moment().toISOString(),
      salary: 1000,
    },
  })

  const { mutate: editEmployee } = useMutation({
    mutationFn: (data: IEmployeeRequest) =>
      employeeApi.updateEmployee(
        {
          account_id: data.account_id,
          position_id: data.position_id,
          fullname: data.fullname,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
          salary: data.salary,
          started_date: data.started_date,
        },
        employeeId,
      ),
    onSuccess: () => {
      toast.success('Employee updated successfully')
    },
    onError: () => {
      toast.error('Error updating employee')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'employees',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.employeeDetails.gen(employeeId) })
    },
  })

  function onSubmit(data: z.infer<typeof employeeSchema>) {
    editEmployee({
      account_id: data.account_id,
      position_id: data.position_id,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      salary: data.salary,
      started_date: data.started_date,
    })
  }

  useEffect(() => {
    if (!!employee) {
      form.setValue('account_id', employee.account_id)
      form.setValue('position_id', employee.position_id)
      form.setValue('fullname', employee.fullname)
      form.setValue('email', employee.email)
      form.setValue('phone', employee.phone)
      form.setValue('gender', employee.gender === 'Male' ? 'MALE' : 'FEMALE')
      form.setValue('started_date', moment(employee.started_date).format('DD/MM/YYYY'))
      form.setValue('salary', parseInt(employee.salary))
    }
  }, [employee, form])

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
                      defaultValue={field.value}
                      placeholder='Gender'
                      items={gender}
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
          name='started_date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='started_date' className='text-left'>
                    Started date
                  </Label>
                  <div className='col-span-3'>
                    <DatePicker
                      date={field.value}
                      selectDate={(val) =>
                        (field.value = val?.toISOString() ?? moment().toISOString())
                      }
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
          name='salary'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='salary' className='text-left'>
                    Salary
                  </Label>
                  <Input id='salary' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='account_id'
          render={({ field }) => (
            <FormItem>
              <Select
                defaultValue={(() => {
                  const account = accounts?.find((acc) => acc.id === field.value)
                  return account?.email + ' - ' + account?.role.title
                })()}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='account_id' className='text-left'>
                      Account
                    </Label>
                    <SelectTrigger className='col-span-3'>
                      <SelectValue
                        placeholder={<span className='text-muted-foreground'>Account</span>}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {!!accounts &&
                          accounts.map((acc) => {
                            if (!acc.employee)
                              return (
                                <SelectItem key={acc.id} value={acc.id}>
                                  {acc.email + ' - ' + acc.role.title}
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

        <FormField
          control={form.control}
          name='position_id'
          render={({ field }) => (
            <FormItem>
              <Select
                defaultValue={positions?.find((p) => p.id === field.value)?.title}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='position_id' className='text-left'>
                      Position
                    </Label>
                    <SelectTrigger className='col-span-3'>
                      <SelectValue
                        placeholder={<span className='text-muted-foreground'>Position</span>}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {!!positions &&
                          positions.map((acc) => (
                            <SelectItem key={acc.id} value={acc.id}>
                              {acc.title}
                            </SelectItem>
                          ))}
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
          Edit Employee
        </Button>
      </form>
    </Form>
  )
}
