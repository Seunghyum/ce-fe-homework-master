interface PostCardProps {
  title: string;
  username: string;
  created_at: string;
  toolBar: React.ReactNode;
  onClick: () => void;
}

export default function PostCard({
  title,
  username,
  created_at,
  toolBar,
  onClick,
}: PostCardProps) {
  return (
    <div
      className="border border-gray-300 rounded-md p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg">{title}</h2>
        {toolBar && <div className="flex items-center gap-2">{toolBar}</div>}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{username}</p>
        <p className="text-sm text-gray-500">{created_at}</p>
      </div>
    </div>
  );
}
