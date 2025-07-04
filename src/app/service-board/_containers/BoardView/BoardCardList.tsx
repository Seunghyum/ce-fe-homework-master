import { DropdownButton } from '@/app/components/DropdownButton'
import PostCard from '@/app/components/PostCard'
import { Issue } from '@/query/repoIssues'

interface BoardCardListProps {
  data: Issue[]
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onDetail: (id: number) => void
}

export default function BoardCardList({ data, onEdit, onDelete, onDetail }: BoardCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {data?.map((item) => (
        <PostCard
          key={item.id}
          title={item.title}
          username={item.user.login}
          created_at={item.created_at.toString()}
          onClick={() => onDetail(item.number)}
          toolBar={
            <DropdownButton
              preventClickBubbling
              data={[
                { title: '수정', onClick: () => onEdit(item.number) },
                { title: '삭제', onClick: () => onDelete(item.number) },
              ]}
            >
              ···
            </DropdownButton>
          }
        />
      ))}
    </div>
  )
}
