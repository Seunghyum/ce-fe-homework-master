"use client";

import { Issue } from "@/query/repoIssues";
import { DropdownButton } from "@/app/components/DropdownButton";
interface BoardTableProps {
  data: Issue[]; // 게시글 목록
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDetail: (id: number) => void;
}

export default function BoardTable({
  data,
  onEdit,
  onDelete,
  onDetail,
}: BoardTableProps) {
  return (
    data.length > 0 && (
      <table className="w-full border-collapse border-spacing-0">
        <thead className="bg-gray-100">
          <tr className="border-b border-gray-200">
            <th>번호</th>
            <th>타이틀</th>
            <th>작성자</th>
            <th>등록일시</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-r border-gray-200">
          {data.map((issue) => (
            <tr
              className="border-b border-l border-gray-200 cursor-pointer"
              onClick={() => onDetail(issue.number)}
              key={issue.id}
            >
              <td className="text-center">{issue.number}</td>
              <td className="text-center">{issue.title}</td>
              <td className="text-center">{issue.user?.login}</td>
              <td className="text-center">
                {issue.created_at.toLocaleString()}
              </td>
              <td className="text-center">
                <DropdownButton
                  preventClickBubbling
                  data={[
                    {
                      title: "수정",
                      onClick: () => onEdit(issue.number),
                    },
                    {
                      title: "삭제",
                      onClick: () => onDelete(issue.number),
                    },
                  ]}
                >
                  ···
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
}
