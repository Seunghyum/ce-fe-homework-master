import { Suspense } from 'react'

import { QueryClient } from '@tanstack/react-query'

import BoardView from '@/app/service-board/_containers/BoardView'
import ListPagination from '@/app/service-board/_containers/ListPagination'
import ToolBar from '@/app/service-board/_containers/ToolBar'
import { PrefetchBoundary } from '@/hoc/PrefetchBoundary'
import QueryErrorSuspenseBoundary from '@/hoc/QueryErrorSuspenseBoundary'
import SubHeader from '@/layout/SubHeader'
import { fetchRepoIssues, repoIssuesKey } from '@/query/repoIssues'

import Loading from '../components/Loading'

export default function ServiceBoardWrapper() {
  return (
    <QueryErrorSuspenseBoundary>
      <ServiceBoard />
    </QueryErrorSuspenseBoundary>
  )
}

async function ServiceBoard() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: repoIssuesKey.list(1),
    queryFn: () => fetchRepoIssues({ page: 1 }),
  })

  return (
    <SubHeader title="서비스 게시판">
      <ToolBar />
      <Suspense fallback={<Loading />}>
        <PrefetchBoundary
          prefetchOptions={{
            queryKey: repoIssuesKey.list(1),
            queryFn: () => fetchRepoIssues({ page: 1 }),
          }}
        >
          <BoardView />
        </PrefetchBoundary>
      </Suspense>
      <ListPagination />
    </SubHeader>
  )
}
