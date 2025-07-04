import { PrefetchBoundary } from '@/hoc/PrefetchBoundary'
import SubHeader from '@/layout/SubHeader'
import { fetchRepoIssueById, repoIssuesKey } from '@/query/repoIssues'

import PostDetailWrapper from './_containers/PostDetail'

export default async function IssueDetailPage({ params }: { params: Promise<{ issueId: string }> }) {
  const { issueId } = await params

  return (
    <SubHeader title="서비스 게시판">
      <PrefetchBoundary
        prefetchOptions={{
          queryKey: repoIssuesKey.detail(issueId),
          queryFn: () => fetchRepoIssueById(issueId),
        }}
      >
        <PostDetailWrapper issueId={issueId} />
      </PrefetchBoundary>
    </SubHeader>
  )
}
