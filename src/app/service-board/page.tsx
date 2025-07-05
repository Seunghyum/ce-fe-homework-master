import { Suspense } from 'react'

import BoardView from '@/app/service-board/_containers/BoardView'
import ListPagination from '@/app/service-board/_containers/ListPagination'
import ToolBar from '@/app/service-board/_containers/ToolBar'
import { PrefetchBoundary } from '@/hoc/PrefetchBoundary'
import QueryErrorSuspenseBoundary from '@/hoc/QueryErrorSuspenseBoundary'
import SubHeader from '@/layout/SubHeader'
import { repoIssues } from '@/query/repoIssues/'

import Loading from '../_components/Loading'

export default function ServiceBoardWrapper() {
  return (
    <QueryErrorSuspenseBoundary>
      <ServiceBoard />
    </QueryErrorSuspenseBoundary>
  )
}

async function ServiceBoard() {
  return (
    <SubHeader title="서비스 게시판">
      <ToolBar />
      <Suspense fallback={<Loading />}>
        <PrefetchBoundary
          prefetchOptions={{
            queryKey: repoIssues.key.list(1),
            queryFn: () => repoIssues.api.fetchRepoIssues({ page: 1 }),
          }}
        >
          <BoardView />
        </PrefetchBoundary>
      </Suspense>
      <ListPagination />
    </SubHeader>
  )
}
