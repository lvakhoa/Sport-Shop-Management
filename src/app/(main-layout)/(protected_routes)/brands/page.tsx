'use client'

import { brandFilterInput, columns, CreateBrandForm } from './components'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { brandApi } from '@/apis'
import { IBrand } from '@/interfaces/brand'

export default function BrandManagementPage() {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.brands.gen(pagination.pageIndex),
    queryFn: () => brandApi.getAllBrands(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const data: IBrand[] = queryData || []

  return (
    <div className='container mx-auto py-10'>
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title='Brands'
          queryKey='brands'
          addContentSidebar={<CreateBrandForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={brandFilterInput}
          pageCount={data.length > 0 ? data[0].total / pagination.pageSize : 0}
        />
      )}
    </div>
  )
}
