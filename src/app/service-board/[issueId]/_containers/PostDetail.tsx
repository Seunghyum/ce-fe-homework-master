'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import AlertModal from '@/app/components/AlertModal'
import { DropdownButton } from '@/app/components/DropdownButton'
import { useModal } from '@/app/components/ModalContext'
import { PATH } from '@/constants/path'
import { useDeleteRepoIssueMutation, useRepoIssueByIdQuery } from '@/query/repoIssues'
import { parsePath } from '@/utils/path'

export default function PostDetail({ issueId }: { issueId: string }) {
  const router = useRouter()
  const { mutate: deleteIssue } = useDeleteRepoIssueMutation()
  const { data } = useRepoIssueByIdQuery(issueId)
  const { openModal } = useModal()
  const handleEdit = () => {
    router.push(parsePath(PATH.SERVICE_BOARD_EDIT, { issueId }))
  }
  const handleDelete = () => {
    openModal(
      <AlertModal
        title="게시글 삭제"
        message="게시글을 삭제하시겠습니까?"
        onConfirm={() => {
          deleteIssue(issueId)
          router.push(parsePath(PATH.SERVICE_BOARD))
        }}
      />,
    )
  }

  return (
    <div className="rounded-md border-2 border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl font-bold">{data?.title}</h1>
        <DropdownButton
          data={[
            { title: '수정', onClick: handleEdit },
            {
              title: '삭제',
              onClick: handleDelete,
            },
          ]}
        >
          ···
        </DropdownButton>
      </div>
      <p className="text-sm text-gray-500">
        {data?.user?.login} | {data?.created_at.toLocaleString()}
      </p>
      <hr className="my-4" />

      <p className="min-h-[50vh]  whitespace-pre-wrap">{data?.body}</p>
      <hr className="my-4" />
      <div className="flex justify-end">
        <Link href={PATH.SERVICE_BOARD}>
          <button className="cursor-pointer rounded-md border border-gray-300 p-2">목록</button>
        </Link>
      </div>
    </div>
  )
}
