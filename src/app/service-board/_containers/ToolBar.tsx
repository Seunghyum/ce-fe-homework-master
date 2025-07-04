'use client'

import Link from 'next/link'

import { useRef } from 'react'

import { useSearchTextStore } from '@/app/service-board/_stores/useSearchText'
import { PATH } from '@/constants/path'

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
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <input
          ref={searchRef}
          onKeyDown={handleEnterSearch}
          className="rounded-md border border-gray-300 p-2"
          type="text"
        />
        <button onClick={handleClickSearch} className="rounded-md border border-gray-300 p-2">
          검색
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Link href={PATH.SERVICE_BOARD_CREATE}>
          <button className="cursor-pointer rounded-md border border-gray-300 p-2">등록</button>
        </Link>
      </div>
    </div>
  )
}
