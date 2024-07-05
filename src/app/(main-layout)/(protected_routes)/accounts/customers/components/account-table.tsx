'use client'

import { FILTER_INPUT_TYPE, ROLE_TITLE } from '@/configs/enum'
import { customerAccountColumns, ICustomerAccount } from './account-columns'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { accountApi, customerAccountApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import moment from 'moment'
import CreateCustomerAccountForm from './create-account'

const customerAccFilterInput: IFilterInput[] = [
  {
    key: 'email',
    title: 'Email',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
]

export default function CustomerAccountTable({ accountRole }: { accountRole: ROLE_TITLE }) {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.customerAccount,
    queryFn: () =>
      customerAccountApi.getAllCustomerAccounts(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  console.log('queryData', queryData)

  const data: ICustomerAccount[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        email: item.email,
        customer: item.customer ? item.customer.fullname : 'N/A',
        total: item.total,
      }
    }) ?? []

  return (
    <>
      {!!isBrowser && (
        <DataTable
          columns={customerAccountColumns(accountRole)}
          data={data}
          title='Customer Accounts'
          queryKey='customer-account'
          addContentSidebar={<CreateCustomerAccountForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={customerAccFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          showAddButton={accountRole === ROLE_TITLE.ADMIN || accountRole === ROLE_TITLE.MANAGER}
          showRestoreButton={accountRole === ROLE_TITLE.ADMIN || accountRole === ROLE_TITLE.MANAGER}
          restore7daysFn={() =>
            accountApi.restoreByDate(moment().subtract(7, 'days').utc().unix().valueOf())
          }
          restore30daysFn={() =>
            accountApi.restoreByDate(moment().subtract(30, 'days').utc().unix().valueOf())
          }
          restoreAllFn={() => accountApi.restoreByDate()}
        />
      )}
    </>
  )
}
