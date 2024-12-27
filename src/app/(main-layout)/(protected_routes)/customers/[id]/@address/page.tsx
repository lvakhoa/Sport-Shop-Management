'use client'

import { GENDER } from '@/configs/enum'
import { columns, addressFilterInput, IAddress } from './component'
import { DataTable, ContentCard } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { addressApi, customerApi } from '@/apis'
import CreateAddressForm from './component/create-address'
import { useParams, notFound } from 'next/navigation'

export default function AddressPage() {
  const { id: customerId } = useParams<{ id: string }>()
  const { data: customerData } = useQuery({
    queryKey: queryKeys.customerDetails.gen(customerId),
    queryFn: () => customerApi.getCustomerById(customerId),
    throwOnError(error, query) {
      notFound()
    },
  })

  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.addresses.gen(),
    queryFn: () => addressApi.getAllAddress(),
    placeholderData: (previousData) => previousData,
  })

  return (
    <div>
      {!!isBrowser && (
        <div className='container'>
          <DataTable
            columns={columns}
            data={[]}
            title='Address'
            queryKey='addresses'
            pagination={pagination}
            setPagination={setPagination}
            filterInput={addressFilterInput}
            addContentSidebar={<CreateAddressForm />}
            showAddButton={false}
          />
        </div>
      )}
    </div>
  )
}
