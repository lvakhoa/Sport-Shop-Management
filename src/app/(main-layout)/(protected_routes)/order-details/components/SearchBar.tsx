import Image from 'next/image'
import { Input } from '@/components/shared/input'
import ComboBox from '@/components/shared/ComboBox'
import { useState } from 'react'

const Filter: string[] = ['All Order', 'Success', 'Cancelled', 'Pending']

interface ISearchBar {
  onSearch: (query: string) => void
  onSelectFilter: (filter: string) => void
  selectedFilter?: string
  filterOptions?: string[]
}

function SearchBar({ onSearch, onSelectFilter, selectedFilter, filterOptions }: ISearchBar) {
  const [searchInput, setSearchInput] = useState('')
  const [filterInput, setFilterInput] = useState('All Order')

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchInput(value)
    onSearch(value)
  }

  const handleFilterInputChange = (value: string) => {
    setFilterInput(value)
    onSelectFilter(value)
  }

  // const handleFilterChange = (selectedOption: string) => {
  //   onSelectFilter(selectedOption)
  // }
  return (
    <div className='flex flex-col space-y-[5px]'>
      <div className='relative z-[-1] flex w-full items-center'>
        <Input
          className='h-[45px] w-full pl-[45px] text-[14px]'
          placeholder='Search by ID, Date, Name,...'
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <Image
          className='absolute m-3 text-muted-foreground'
          alt=''
          src='assets/icons/search.svg'
          width={20}
          height={20}
        />
      </div>
      <ComboBox
        placeholder={filterInput}
        items={Filter}
        className='h-[45px]'
        onValueChange={handleFilterInputChange}
      />
    </div>
  )
}

export default SearchBar
