'use client'

import { FILTER_INPUT_TYPE, STATUS } from '@/configs/enum'
import { columns, IVoucher } from './components'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { productApi, voucherApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import { currencyFormatter } from '@/helpers'
import CreateVoucherForm from './components/create-voucher'
import moment from 'moment'

const voucherFilterInput: IFilterInput[] = [
  {
    key: 'title',
    title: 'Title',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'code',
    title: 'Code',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'sale_percent',
    title: 'Sale Percent',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'quantity',
    title: 'Quantity',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
]

export default function VouchersManagementPage() {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.vouchers.gen(pagination.pageIndex),
    queryFn: () => voucherApi.getAllVouchers(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const data: IVoucher[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        title: item.title,
        code: item.code,
        sale_percent: item.sale_percent.toString(),
        quantity: item.quantity.toString(),
        expired_date: moment(item.expired_date).toString(),
        total: item.total,
      }
    }) ?? []

  return (
    <div className='container mx-auto py-10'>
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title='Vouchers'
          addContentSidebar={<CreateVoucherForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={voucherFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          showRestoreButton={true}
          restore7daysFn={() =>
            voucherApi.restoreVoucher(moment().subtract(7, 'days').utc().unix().valueOf())
          }
          restore30daysFn={() =>
            voucherApi.restoreVoucher(moment().subtract(30, 'days').utc().unix().valueOf())
          }
          restoreAllFn={() => voucherApi.restoreVoucher()}
        />
      )}
    </div>
  )
}
