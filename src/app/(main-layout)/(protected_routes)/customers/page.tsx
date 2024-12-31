'use client'

import { columns, customerFilterInput, CreateCustomerForm } from './components'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { customerApi } from '@/apis'
import { ICustomer } from '@/interfaces/customer'

export default function CustomerManagementPage() {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.customers.gen(pagination.pageIndex),
    queryFn: () => customerApi.getAllCustomers(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const data: ICustomer[] = queryData || []

  return (
    <div className='container mx-auto py-10'>
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title='Customers'
          queryKey='customers'
          addContentSidebar={<CreateCustomerForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={customerFilterInput}
          pageCount={data.length > 0 ? data[0].total / pagination.pageSize : 0}
        />
      )}
    </div>
  )
}
