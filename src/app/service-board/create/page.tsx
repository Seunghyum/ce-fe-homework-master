'use client'

import { useRouter } from 'next/navigation'

import { PATH } from '@/constants/path'
import { useCreateRepoIssuesMutation } from '@/query/repoIssues'

import PostForm, { FormValues } from '../_containers/PostForm'

export default function CreatePage() {
  const router = useRouter()
  const { mutateAsync } = useCreateRepoIssuesMutation()
  const onSubmit = async (data: FormValues) => {
    await mutateAsync(data)
    router.push(PATH.SERVICE_BOARD)
  }

  return <PostForm onSubmit={onSubmit} />
}
