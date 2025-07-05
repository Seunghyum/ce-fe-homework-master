'use client'

import { Pagination } from '@/app/_components/Pagination'
import { usePaginationStore } from '@/app/service-board/_stores/usePaginationStore'

import useRepoIssues from '../_hooks/useRepoIssues'

export default function ListPagination() {
  const page = usePaginationStore((state) => state.page)

  const { total_pages } = useRepoIssues()

  const setPage = usePaginationStore((state) => state.setPage)

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return <Pagination totalPages={total_pages} currentPage={page} onPageChange={handlePageChange} />
}
