'use client'

import { sportFilterInput, columns, CreateSportForm } from './components'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { sportApi } from '@/apis'
import { ISport } from '@/interfaces/sport'

export default function SportManagementPage() {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.sports.gen(pagination.pageIndex),
    queryFn: () => sportApi.getAllSports(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const data: ISport[] = queryData || []

  return (
    <div className='container mx-auto py-10'>
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title='Sports'
          queryKey='sports'
          addContentSidebar={<CreateSportForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={sportFilterInput}
          pageCount={data.length > 0 ? data[0].total / pagination.pageSize : 0}
        />
      )}
    </div>
  )
}
