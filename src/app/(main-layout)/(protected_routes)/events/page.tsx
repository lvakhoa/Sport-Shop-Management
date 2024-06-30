'use client'

import { FILTER_INPUT_TYPE, STATUS } from '@/configs/enum'
import { columns, CreateEventForm, IEvent } from './components'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { eventApi, productApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import { currencyFormatter } from '@/helpers'
import moment from 'moment'

const eventFilterInput: IFilterInput[] = [
  {
    key: 'title',
    title: 'Title',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'sale_percent',
    title: 'Sale Percent',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
]

export default function EventsManagementPage() {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.events.gen(pagination.pageIndex),
    queryFn: () => eventApi.getAllEvents(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const data: IEvent[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        title: item.title,
        content: item.content,
        sale_percent: item.sale_percent.toString(),
        start_date: moment(item.start_date).toString(),
        end_date: moment(item.end_date).toString(),
        total: item.total,
      }
    }) ?? []

  return (
    <div className='container mx-auto py-10'>
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title='Events'
          addContentSidebar={<CreateEventForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={eventFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
        />
      )}
    </div>
  )
}
