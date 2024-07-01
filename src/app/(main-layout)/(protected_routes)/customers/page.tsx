'use client'

import { columns, customerFilterInput, ICustomer, CreateCustomerForm } from './components'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { customerApi } from '@/apis'
import moment from 'moment'

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

  const data: ICustomer[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        name: item.fullname,
        email: item.email,
        phone: item.phone,
        gender: item.gender,
        rank: item.rank,
        loyalty_point: item.loyalty_point,
        total: item.total,
      }
    }) ?? []

  return (
    <div className='container mx-auto py-10'>
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title='Customers'
          addContentSidebar={<CreateCustomerForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={customerFilterInput}
          pageCount={data.length > 0 ? data[0].total / pagination.pageSize : 0}
          showRestoreButton={true}
          restore7daysFn={() =>
            customerApi.restoreCustomer(moment().subtract(7, 'days').utc().unix().valueOf())
          }
          restore30daysFn={() =>
            customerApi.restoreCustomer(moment().subtract(30, 'days').utc().unix().valueOf())
          }
          restoreAllFn={() => customerApi.restoreCustomer()}
        />
      )}
    </div>
  )
}
