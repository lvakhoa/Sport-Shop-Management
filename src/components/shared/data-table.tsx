'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import Dropdown from './DropdownMenu'
import SidebarEdit from './SidebarEdit'
import ComboBox from './ComboBox'
import { Input } from './input'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { motion } from 'framer-motion'
import { IFilterInput } from '@/interfaces'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'
import { RotateCcw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import RestorePopup from './RestorePopup'
import { useMutation, useQueryClient, UseMutateFunction } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { toast } from 'react-toastify'
import { utils as xlsxUtils, writeFile as xlsxWriteFile } from 'xlsx'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title: string
  addContentSidebar?: ReactElement
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  filterInput: IFilterInput[]
  isPending?: boolean
  pageCount?: number
  showAddButton?: boolean
  csvFormDialog?: ReactElement
  showRestoreButton?: boolean
  restore7daysFn?: () => Promise<string | undefined>
  restore30daysFn?: () => Promise<string | undefined>
  restoreAllFn?: () => Promise<string | undefined>
}

interface InputValues {
  [key: string]: string
}

const exports: string[] = ['XLS']
const restoreOptions: string[] = ['7 days', '30 days', 'All']

const exportTrigger = (
  <div className='flex gap-[5px]'>
    <Image src='/icons/export.svg' alt='' width={20} height={20} />
    <span className='text-[15px] text-secondary max-[768px]:hidden'>Export</span>
    <Image src='/icons/down_arrow.svg' alt='' width={20} height={20} />
  </div>
)

export default function DataTable<TData, TValue>({
  columns,
  data,
  title,
  addContentSidebar,
  pagination,
  setPagination,
  filterInput,
  pageCount = 0,
  showAddButton = true,
  showRestoreButton = false,
  csvFormDialog,
  restore7daysFn,
  restore30daysFn,
  restoreAllFn,
}: DataTableProps<TData, TValue>) {
  const [isOpened, setIsOpened] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [inputValues, setInputValues] = useState<InputValues>({})

  const handleInputChange = (key: any, value: string) => {
    setInputValues({ ...inputValues, [key]: value })
  }

  const handleClear = () => {
    setInputValues({})
  }

  const handleOpenFilter = () => {
    setIsOpened(!isOpened)
  }

  const handleExport = (type: string) => {
    if (type === 'XLS') {
      exportToXLS(data)
    }
  }

  const exportToXLS = (data: any[]) => {
    const ws = xlsxUtils.json_to_sheet(data)
    const wb = xlsxUtils.book_new()
    xlsxUtils.book_append_sheet(wb, ws, 'Data')
    const fileName = 'Exported.xlsx'
    xlsxWriteFile(wb, fileName)
  }

  const addingBtnTitle = title
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: pageCount,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
  })

  const queryClient = useQueryClient()

  const { mutate: restore7daysData } = useMutation({
    mutationFn: restore7daysFn,
    onSuccess: () => {
      toast.success('Data restored successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === title.toLowerCase(),
      })
    },
  })

  const { mutate: restore30daysData } = useMutation({
    mutationFn: restore30daysFn,
    onSuccess: () => {
      toast.success('Data restored successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === title.toLowerCase(),
      })
    },
  })

  const { mutate: restoreAllData } = useMutation({
    mutationFn: restoreAllFn,
    onSuccess: () => {
      toast.success('Data restored successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === title.toLowerCase(),
      })
    },
  })

  return (
    <div>
      <div className='rounded-md border'>
        <div className={cn('bg-white flex flex-col gap-10 rounded-md px-[21px] py-[25px]')}>
          <motion.div
            animate={isOpened ? { marginBottom: 0 } : {}}
            transition={{ duration: 0.3 }}
            className={
              '-mb-10 flex items-center justify-between max-[468px]:flex-col max-[468px]:gap-[10px]'
            }
          >
            <div className='mb-2'>
              <span className='text-2xl font-semibold'>{title}</span>
            </div>
            <div className='flex gap-[15px]'>
              {csvFormDialog}
              {showRestoreButton && !!restore7daysFn && !!restore30daysFn && !!restoreAllFn && (
                <RestorePopup
                  title='Restore'
                  description='Select the duration to restore'
                  option1={restore7daysData}
                  option2={restore30daysData}
                  option3={restoreAllData}
                >
                  <Button className='bg-white flex gap-[5px] rounded-[5px] border border-secondary px-2 py-1 duration-300 hover:bg-[#EBF1FF]'>
                    <RotateCcw size={20} className='stroke-secondary' />
                    <span className='text-[15px] text-secondary max-[768px]:hidden'>Restore</span>
                  </Button>
                </RestorePopup>
              )}
              <Button
                onClick={handleOpenFilter}
                className='bg-white flex gap-[5px] rounded-[5px] border border-secondary px-2 py-1 duration-300 hover:bg-[#EBF1FF]'
              >
                <Image width={20} height={20} src='/icons/filter.svg' alt='' />
                <span className='text-[15px] font-normal text-secondary max-[768px]:hidden'>
                  Filter
                </span>
                <Image width={20} height={20} src='/icons/down_arrow.svg' alt='' />
              </Button>
              <Dropdown
                className='rounded-[5px] border border-secondary px-2 py-1 duration-300 hover:bg-[#EBF1FF]'
                trigger={exportTrigger}
                items={exports}
                onSelect={handleExport}
              />

              {showAddButton && (
                <SidebarEdit
                  title={`Add ${addingBtnTitle}`}
                  description=''
                  content={addContentSidebar}
                >
                  <Button className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'>
                    <Image width={20} height={20} src='/icons/plus_circle.svg' alt='' />
                    <span className='text-[15px] font-normal text-[#FFFFFF] max-[768px]:hidden'>
                      Add {addingBtnTitle}
                    </span>
                  </Button>
                </SidebarEdit>
              )}
            </div>
          </motion.div>

          <motion.div
            animate={isOpened ? { height: 'auto' } : {}}
            transition={{ duration: 0.3 }}
            className={cn('flex h-0 flex-col gap-8 overflow-hidden')}
          >
            <div className='grid w-full grid-cols-3 items-center gap-5 lg:grid-cols-6'>
              {filterInput.map((item) => {
                if (!!item.dropdownItems)
                  return (
                    <ComboBox
                      className='w-full'
                      key={item.key}
                      placeholder={`Select ${item.title.toLowerCase()}`}
                      items={item.dropdownItems}
                      onValueChange={(value) => {
                        table.getColumn(item.key)?.setFilterValue(value)
                      }}
                    />
                  )
                return (
                  <Input
                    key={item.key}
                    placeholder={item.title}
                    value={inputValues[item.key] || ''}
                    onChange={(e) => {
                      table.getColumn(item.key)?.setFilterValue(e.target.value)
                      handleInputChange(item.key, e.target.value)
                    }}
                  />
                )
              })}
              <Button
                className='bg-white flex size-8 gap-[5px] rounded-[5px] border border-secondary px-2 py-1 duration-300 hover:bg-[#EBF1FF]'
                onClick={(e) => {
                  table.resetColumnFilters()
                  handleClear()
                }}
              >
                <Image width={100} height={100} alt='' src='/icons/clear.svg' />
              </Button>
            </div>
          </motion.div>
        </div>

        <Table id='table-container'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers
                  .filter((item) => !item.id.includes('id'))
                  .map((header) => {
                    return (
                      <TableHead key={header.id} className='text-black font-bold'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row
                    .getVisibleCells()
                    .filter((item) => !item.id.includes('id'))
                    .map((cell) => (
                      <TableCell key={cell.id} className='text-[#424242]'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <ToggleGroup type='single' defaultValue={'0'}>
          {Array.from({ length: pageCount }).map((_, index) => (
            <ToggleGroupItem
              key={index}
              className='bg-white-100'
              variant='outline'
              size='sm'
              onClick={() => table.setPageIndex(index)}
              value={index.toString()}
            >
              {index + 1}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
