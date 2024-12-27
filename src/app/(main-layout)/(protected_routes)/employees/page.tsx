'use client'

import { columns, CreateEmployeeForm, employeeFilterInput, IEmployee } from './components'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { employeeApi } from '@/apis'

export default function EmployeesManagementPage() {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.employees.gen(pagination.pageIndex),
    queryFn: () => employeeApi.getAllEmployees(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const data: IEmployee[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        fullname: item.fullname,
        phone: item.phone,
        gender: item.gender,
        total: item.total,
      }
    }) ?? []

  return (
    <div className='container mx-auto py-10'>
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title='Employees'
          queryKey='employees'
          addContentSidebar={<CreateEmployeeForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={employeeFilterInput}
          pageCount={data.length > 0 ? data[0].total / pagination.pageSize : 0}
        />
      )}
    </div>
  )
}
