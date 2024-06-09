import { Input } from '@/components/shared/input'
import { SetStateAction, useState } from 'react'
import { Search } from 'lucide-react'

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div style={{ position: 'relative' }}>
      <Search
        size={20}
        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
      />
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        placeholder="Search..."
        style={{ paddingLeft: '40px' }}
      />
    </div>
  )
}
