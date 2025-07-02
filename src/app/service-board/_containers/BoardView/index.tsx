'use client'

import { VIEW_TYPE } from '@/constants/viewType'

import BoardTable from './BoardTable'
import BoardCardList from './BoardCardList'
import { useViewTypeStore } from './useViewTypeStore'
import ToolBar from '@/app/service-board/_containers/ToolBar'
import { ListPagination } from '@/app/components/ListPagination'
import { usePaginationStore } from '@/app/service-board/_stores/usePaginationStore'
import { useDeleteRepoIssueMutation, useRepoIssuesQuery } from '@/query/repoIssues'
import { useSearchTextStore } from '@/app/service-board/_stores/useSearchText'
import { parsePath } from '@/utils/path'
import { PATH } from '@/constants/path'
import { useRouter } from 'next/navigation'
import AlertModal from '@/app/components/AlertModal'
import { useModal } from '@/app/components/ModalContext'
import { useIsMounted } from '@/hooks/useIsMounted'

export default function BoardView() {
  const router = useRouter()
  const { openModal, closeModal } = useModal()
  const { mutate: deleteIssue } = useDeleteRepoIssueMutation()
  const viewType = useViewTypeStore((state) => state.viewType)
  const page = usePaginationStore((state) => state.page)
  const setPage = usePaginationStore((state) => state.setPage)
  const search = useSearchTextStore((state) => state.search)
  const isMounted = useIsMounted()

  const {
    data: { data, total_pages } = { data: [], total_pages: 1 },
    isFetching,
    isFetched,
  } = useRepoIssuesQuery({
    page,
    per_page: 10,
    search,
  })

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
      <ToolBar />
      {!isFetching && data.length === 0 && (
        <div className="flex justify-center items-center h-full">등록된 게시글이 없습니다. 새글을 등록해보세요.</div>
      )}
      {isMounted && viewType === VIEW_TYPE.LIST && !isFetching && (
        <BoardTable data={data} onEdit={handleEdit} onDelete={handleDelete} onDetail={handleClickItem} />
      )}
      {isMounted && viewType === VIEW_TYPE.CARD && !isFetching && (
        <BoardCardList data={data} onEdit={handleEdit} onDelete={handleDelete} onDetail={handleClickItem} />
      )}
      {isFetched && data.length > 0 && (
        <ListPagination currentPage={page} totalPages={total_pages} onPageChange={(newPage) => setPage(newPage)} />
      )}
    </>
  )
}
