'use client'

import { FILTER_INPUT_TYPE, ROLE_TITLE } from '@/configs/enum'
import { eventColumns, IEvent } from './event-columns'
import CreateEventForm from './create-event'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { eventApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
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

export default function EventTable({ accountRole }: { accountRole: ROLE_TITLE }) {
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
    <>
      {!!isBrowser && (
        <DataTable
          columns={eventColumns(accountRole)}
          data={data}
          title='Events'
          addContentSidebar={<CreateEventForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={eventFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          showAddButton={accountRole === ROLE_TITLE.ADMIN || accountRole === ROLE_TITLE.MANAGER}
          showRestoreButton={accountRole === ROLE_TITLE.ADMIN || accountRole === ROLE_TITLE.MANAGER}
          restore7daysFn={() =>
            eventApi.restoreEvent(moment().subtract(7, 'days').utc().unix().valueOf())
          }
          restore30daysFn={() =>
            eventApi.restoreEvent(moment().subtract(30, 'days').utc().unix().valueOf())
          }
          restoreAllFn={() => eventApi.restoreEvent()}
        />
      )}
    </>
  )
}
