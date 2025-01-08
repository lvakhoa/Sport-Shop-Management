'use client'

import { FILTER_INPUT_TYPE, ROLE_NAME } from '@/configs/enum'
import { IVoucherCol, voucherColumns } from './voucher-columns'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { voucherApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { IVoucher } from '@/interfaces/voucher'
import { PaginationState } from '@tanstack/react-table'
import CreateVoucherForm from './create-voucher'
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

function VoucherTable({ accountRole }: { accountRole: ROLE_NAME }) {
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

  const data: IVoucherCol[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        code: item.code,
        campaign_name: item.campaign_name,
        voucher_type: item.voucher_type,
        voucher_value: item.voucher_value,
        starting_date: item.starting_date,
        ending_date: item.ending_date,
        total_quantity: item.total_quantity,
        quantity_per_user: item.quantity_per_user,
        minimum_price: item.minimum_price,
        applicable_type: item.applicable_type,
        total: item.total,
      }
    }) ?? []

  return (
    <>
      {!!isBrowser && (
        <DataTable
          columns={voucherColumns(accountRole)}
          data={data}
          title='Vouchers'
          queryKey='vouchers'
          addContentSidebar={<CreateVoucherForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={voucherFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          showAddButton={accountRole === ROLE_NAME.ADMIN}
        />
      )}
    </>
  )
}

export default VoucherTable
