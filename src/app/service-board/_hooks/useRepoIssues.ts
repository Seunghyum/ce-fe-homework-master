import { usePaginationStore } from '@/app/service-board/_stores/usePaginationStore'
import { useSearchTextStore } from '@/app/service-board/_stores/useSearchText'
import { useRepoIssuesQuery } from '@/query/repoIssues'

export default function useRepoIssues() {
  const page = usePaginationStore((state) => state.page)
  const search = useSearchTextStore((state) => state.search)

  const { data: { data, total_pages } = { data: [], total_pages: 1 }, ...rest } = useRepoIssuesQuery({
    page,
    per_page: 10,
    search,
  })
  return { data, total_pages, ...rest }
}
