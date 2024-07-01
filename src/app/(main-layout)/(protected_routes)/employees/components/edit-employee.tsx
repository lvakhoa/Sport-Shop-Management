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

const employeeSchema = z
  .object({
    account_id: z.string().nullable(),
    position_id: z.string().nullable(),
    fullname: z.string(),
    phone: z.string(),
    email: z.string().email().optional(),
    gender: z.enum(['MALE', 'FEMALE']),
    started_date: z.string().datetime(),
    salary: z.string(),
  })
  .partial()

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

  const account = accounts?.find((acc) => acc?.employee?.id === employeeId)

  function onSubmit(data: z.infer<typeof employeeSchema>) {
    editEmployee({
      account_id: data.account_id === null ? undefined : data.account_id,
      position_id: data.position_id === null ? undefined : data.position_id,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      salary: parseInt(data.salary || '0'),
      started_date: data.started_date,
    })
  }

  useEffect(() => {
    if (!!employee) {
      form.setValue('salary', employee.salary)
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
                  <Input
                    id='fullname'
                    placeholder={employee?.fullname}
                    className='col-span-3'
                    {...field}
                  />
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
                  <Input
                    id='phone'
                    placeholder={employee?.phone}
                    className='col-span-3'
                    {...field}
                  />
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
                  <Input
                    id='email'
                    placeholder={employee?.email}
                    className='col-span-3'
                    {...field}
                  />
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
                      placeholder={employee?.gender as string}
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
                      date={!!field.value ? moment(field.value).toDate() : moment().toDate()}
                      selectDate={(val) =>
                        field.onChange({
                          target: { value: moment(val).toISOString() },
                        })
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
                  <Input
                    type='number'
                    placeholder={employee?.salary}
                    id='salary'
                    className='col-span-3'
                    {...field}
                  />
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
                defaultValue={!!account ? account.email + ' - ' + account.role.title : undefined}
                value={field.value === null ? undefined : field.value}
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
                            if (!acc.employee || acc.employee.id === employeeId)
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
                value={field.value === null ? undefined : field.value}
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
