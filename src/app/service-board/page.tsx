import { Suspense } from 'react'

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import BoardView from '@/app/service-board/_containers/BoardView'
import ListPagination from '@/app/service-board/_containers/ListPagination'
import ToolBar from '@/app/service-board/_containers/ToolBar'
import SubHeader from '@/layout/SubHeader'
import { fetchRepoIssues, repoIssuesKey } from '@/query/repoIssues'

export default async function ServiceBoardPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: repoIssuesKey.list(1),
    queryFn: () => fetchRepoIssues({ page: 1 }),
  })

  return (
    <SubHeader title="서비스 게시판">
      <ToolBar />
      <Suspense fallback={<div className="flex h-full items-center justify-center">Loading...</div>}>
        <PrefetchBoardView />
      </Suspense>
      <ListPagination />
    </SubHeader>
  )
}

export async function PrefetchBoardView() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: repoIssuesKey.list(1),
    queryFn: () => fetchRepoIssues({ page: 1 }),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardView />
    </HydrationBoundary>
  )
}
