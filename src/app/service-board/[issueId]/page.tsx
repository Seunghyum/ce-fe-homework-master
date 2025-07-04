import { Suspense } from 'react'

import { PrefetchBoundary } from '@/hoc/PrefetchBoundary'
import SubHeader from '@/layout/SubHeader'
import { fetchRepoIssueById, repoIssuesKey } from '@/query/repoIssues'

import PostDetail from './_containers/PostDetail'

export default async function IssueDetailPage({ params }: { params: Promise<{ issueId: string }> }) {
  const { issueId } = await params

  return (
    <SubHeader title="서비스 게시판">
      <Suspense fallback={<div className="flex h-full items-center justify-center">Loading...</div>}>
        <PrefetchBoundary
          prefetchOptions={{
            queryKey: repoIssuesKey.detail(issueId),
            queryFn: () => fetchRepoIssueById(issueId),
          }}
        >
          <PostDetail issueId={issueId} />
        </PrefetchBoundary>
      </Suspense>
    </SubHeader>
  )
}
