'use client'

import { useRepoIssueByIdQuery, useUpdateRepoIssueMutation } from '@/query/repoIssues'
import PostForm, { FormValues } from '../../_containers/PostForm'
import { PATH } from '@/constants/path'
import { useRouter, useParams } from 'next/navigation'

export default function IssueEditPage() {
  const router = useRouter()
  const { issueId } = useParams<{ issueId: string }>()
  const { data } = useRepoIssueByIdQuery(issueId)
  const { mutate } = useUpdateRepoIssueMutation(issueId)
  const onSubmit = (data: FormValues) => {
    mutate(data)
    router.push(PATH.SERVICE_BOARD)
  }

  return <PostForm title={data?.title} content={data?.body ?? ''} onSubmit={onSubmit} />
}
