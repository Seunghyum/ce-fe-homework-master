interface PostCardProps {
  title: string
  username: string
  created_at: string
  toolBar: React.ReactNode
  onClick: () => void
}

export default function PostCard({ title, username, created_at, toolBar, onClick }: PostCardProps) {
  return (
    <div className="cursor-pointer rounded-md border border-gray-300 p-4" onClick={onClick}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg">{title}</h2>
        {toolBar && <div className="flex items-center gap-2">{toolBar}</div>}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{username}</p>
        <p className="text-sm text-gray-500">{created_at}</p>
      </div>
    </div>
  )
}
