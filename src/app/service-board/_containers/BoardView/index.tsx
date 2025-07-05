'use client'

import { useRouter } from 'next/navigation'

import AlertModal from '@/app/_components/AlertModal'
import { useModal } from '@/app/_context/ModalContext'
import useRepoIssues from '@/app/service-board/_hooks/useRepoIssues'
import { useViewTypeStore } from '@/app/service-board/_stores/useViewTypeStore'
import { PATH } from '@/constants/path'
import { VIEW_TYPE } from '@/constants/viewType'
import { useIsMounted } from '@/hooks/useIsMounted'
import { repoIssues } from '@/query/repoIssues/'
import { parsePath } from '@/utils/path'

import BoardCardList from './BoardCardList'
import BoardTable from './BoardTable'

export default function BoardView() {
  const router = useRouter()
  const { openModal, closeModal } = useModal()
  const { mutate: deleteIssue } = repoIssues.mutation.useDeleteRepoIssueMutation()
  const viewType = useViewTypeStore((state) => state.viewType)
  const isMounted = useIsMounted()

  const { data, isFetching } = useRepoIssues()

  const handleEdit = (id: number) => {
    router.push(parsePath(PATH.SERVICE_BOARD_EDIT, { issueId: id }))
  }

  const handleDelete = (id: number) => {
    openModal(
      <AlertModal
        title="게시글 삭제"
        message="게시글을 삭제하시겠습니까?"
        onConfirm={() => {
          deleteIssue(id.toString())
          closeModal()
        }}
      />,
    )
  }

  const handleClickItem = (id: number) => {
    router.push(parsePath(PATH.SERVICE_BOARD_DETAIL, { issueId: id }))
  }

  return (
    <>
      {!isFetching && data.length === 0 && (
        <div className="flex h-full items-center justify-center">등록된 게시글이 없습니다. 새글을 등록해보세요.</div>
      )}
      {isMounted && viewType === VIEW_TYPE.LIST && !isFetching && (
        <BoardTable data={data} onEdit={handleEdit} onDelete={handleDelete} onDetail={handleClickItem} />
      )}
      {isMounted && viewType === VIEW_TYPE.CARD && !isFetching && (
        <BoardCardList data={data} onEdit={handleEdit} onDelete={handleDelete} onDetail={handleClickItem} />
      )}
    </>
  )
}
