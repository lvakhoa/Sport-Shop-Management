'use client'

import { FILTER_INPUT_TYPE, ROLE_TITLE } from '@/configs/enum'
import { employeeAccountColumns, IEmployeeAccount } from './account-columns'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { accountApi, employeeAccountApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import moment from 'moment'
import CreateEmployeeAccountForm from './create-account'

const employeeAccFilterInput: IFilterInput[] = [
  {
    key: 'email',
    title: 'Email',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'role',
    title: 'Role',
    type: FILTER_INPUT_TYPE.DROPDOWN,
  },
]

export default function EmployeeAccountTable({ accountRole }: { accountRole: ROLE_TITLE }) {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.employeeAccount,
    queryFn: () =>
      employeeAccountApi.getAllEmployeeAccounts(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const [data, setData] = useState<IEmployeeAccount[]>([])

  useEffect(() => {
    if (!!queryData && queryData.length > 0) {
      setData(
        queryData.map((item) => ({
          id: item.id,
          email: item.email,
          role: item.role.title,
          employee: item.employee?.fullname || 'N/A',
          total: item.total,
        })),
      )
    }
  }, [queryData])

  return (
    <>
      {!!isBrowser && (
        <DataTable
          columns={employeeAccountColumns(accountRole)}
          data={data}
          title='Employee Accounts'
          queryKey='employee-account'
          addContentSidebar={<CreateEmployeeAccountForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={employeeAccFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          showAddButton={accountRole === ROLE_TITLE.ADMIN || accountRole === ROLE_TITLE.MANAGER}
          showRestoreButton={false}
        />
      )}
    </>
  )
}
