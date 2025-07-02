import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import SubHeader from '@/layout/SubHeader'
import { fetchRepoIssueById, repoIssuesKey } from '@/query/repoIssues'

import PostDetail from './_containers/PostDetail'

export default async function IssueDetailPage({ params }: { params: Promise<{ issueId: string }> }) {
  const { issueId } = await params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: repoIssuesKey.detail(issueId),
    queryFn: () => fetchRepoIssueById(issueId),
  })
  return (
    <SubHeader title="서비스 게시판">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostDetail issueId={issueId} />
      </HydrationBoundary>
    </SubHeader>
  )
}
