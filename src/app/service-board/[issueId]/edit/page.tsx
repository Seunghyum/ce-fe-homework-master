'use client'

import { useRouter, useParams } from 'next/navigation'

import { PATH } from '@/constants/path'
import { repoIssues } from '@/query/repoIssues/'

import PostForm, { FormValues } from '../../_containers/PostForm'

export default function IssueEditPage() {
  const router = useRouter()
  const { issueId } = useParams<{ issueId: string }>()
  const { data } = repoIssues.query.useRepoIssueByIdQuery(issueId)
  const { mutateAsync } = repoIssues.mutation.useUpdateRepoIssueMutation(issueId)
  const onSubmit = async (data: FormValues) => {
    await mutateAsync(data)
    router.push(PATH.SERVICE_BOARD)
  }

  return <PostForm title={data?.title} content={data?.body ?? ''} onSubmit={onSubmit} />
}
