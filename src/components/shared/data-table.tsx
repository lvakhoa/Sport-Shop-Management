'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/table'
import { Button } from './button'
import { default as Dropdown } from '@/components/shared/DropdownMenu'
import { Input } from './input'
import { filterInput } from '@/app/customers/components/columns-data-table'
import { Select } from './select'
import { ComboBox } from './ComboBox'
import { cn } from '@/lib/utils'
import { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import { SidebarEdit } from '@/components/shared/SidebarEdit'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title: string
  addContentSidebar?: ReactElement
}

interface InputValues {
  [key: string]: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  addContentSidebar,
}: DataTableProps<TData, TValue>) {
  const [isOpened, setIsOpened] = useState(false)

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const [inputValues, setInputValues] = useState<InputValues>({})
  const [comboBoxValue, setComboBoxValue] = useState<string | undefined>(undefined)

  const handleInputChange = (key: any, value: string) => {
    setInputValues({ ...inputValues, [key]: value })
  }

  const handleClear = () => {
    setInputValues({})
  }

  const exports: string[] = ['XSL', 'Print']

  const addingBtnTitle = title.slice(0, title.length - 1)

  const dropdownTrigger = (
    <div className="flex gap-[5px]">
      <Image src="/icons/export.svg" alt="" width={20} height={20} />
      <span className="text-[15px] text-[#648EEF]">Export</span>
      <Image src="/icons/down_arrow.svg" alt="" width={20} height={20} />
    </div>
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  const handleOpenFilter = () => {
    setIsOpened(!isOpened)
  }
  return (
    <div className="rounded-md border">
      <div className={cn('bg-white px-[21px] py-[25px] rounded-md flex flex-col gap-10')}>
        <motion.div
          animate={isOpened ? { marginBottom: 0 } : {}}
          transition={{ duration: 0.3 }}
          className={'flex justify-between items-center -mb-10'}
        >
          <div>
            <span className="text-2xl font-semibold">{title}</span>
          </div>
          <div className="flex gap-[15px]">
            <Button
              onClick={handleOpenFilter}
              className="bg-white hover:bg-[#EBF1FF] flex gap-[5px] border border-[#648EEF] rounded-[5px] px-2 py-1 duration-300"
            >
              <Image width={20} height={20} src="/icons/filter.svg" alt="" />
              <span className="text-[15px] font-normal text-[#648EEF]">Filter</span>
              <Image width={20} height={20} src="icons/down_arrow.svg" alt="" />
            </Button>
            <Dropdown
              className="border border-[#648EEF] hover:bg-[#EBF1FF] rounded-[5px] px-2 py-1 duration-300"
              trigger={dropdownTrigger}
              items={exports}
            />

            <SidebarEdit title={`Add ${addingBtnTitle}`} description="" content={addContentSidebar}>
              <Button className="bg-[#648EEF] hover:bg-[#739AF4] flex gap-[5px] duration-300">
                <Image width={20} height={20} src="/icons/plus_circle.svg" alt="" />
                <span className="text-[15px] font-normal text-[#FFFFFF]">Add {addingBtnTitle}</span>
              </Button>
            </SidebarEdit>
          </div>
        </motion.div>

        <motion.div
          animate={isOpened ? { height: 'auto' } : {}}
          transition={{ duration: 0.3 }}
          className={cn('flex flex-col h-0 gap-8 overflow-hidden')}
        >
          <div className="flex w-full gap-5">
            {filterInput.map((item) => {
              if (!!item.dropdownItems)
                return (
                  <ComboBox
                    className="w-full"
                    key={item.key}
                    placeholder={`Select ${item.title.toLowerCase()}`}
                    items={item.dropdownItems}
                    onValueChange={(e) => {
                      table.getColumn(item.key)?.setFilterValue(e)
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
              className="bg-white hover:bg-[#EBF1FF] flex gap-[5px] border border-[#648EEF] rounded-[5px] px-2 py-1 duration-300"
              onClick={(e) => {
                table.resetColumnFilters()
                handleClear()
              }}
            >
              <Image width={100} height={100} alt="" src="./icons/clear.svg" />
            </Button>
          </div>
        </motion.div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-black font-bold">
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
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-[#424242]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
