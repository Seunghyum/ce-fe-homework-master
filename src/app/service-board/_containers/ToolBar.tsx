'use client'

import { PATH } from '@/constants/path'
import Link from 'next/link'
import { useSearchTextStore } from '@/app/service-board/_stores/useSearchText'
import { useRef } from 'react'

export default function ToolBar() {
  const searchRef = useRef<HTMLInputElement>(null)
  const setSearch = useSearchTextStore((state) => state.setSearch)

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(e.currentTarget.value)
    }
  }

  const handleClickSearch = () => {
    setSearch(searchRef.current?.value ?? '')
  }

  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <input
          ref={searchRef}
          onKeyDown={handleEnterSearch}
          className="border border-gray-300 rounded-md p-2"
          type="text"
        />
        <button onClick={handleClickSearch} className="border border-gray-300 rounded-md p-2">
          검색
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Link href={PATH.SERVICE_BOARD_CREATE}>
          <button className="border border-gray-300 rounded-md p-2 cursor-pointer">등록</button>
        </Link>
      </div>
    </div>
  )
}
