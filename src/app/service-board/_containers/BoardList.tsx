"use client";

import { ListPagination } from "@/app/components/ListPagination";
import { useRepoIssuesQuery } from "@/query/repoIssues";
import { usePaginationStore } from "../_stores/usePaginationStore";
import { useRouter } from "next/navigation";
import { PATH } from "@/constants/path";
import { parsePath } from "@/utils/path";
import { DropdownButton } from "@/app/components/DropdownButton";

export default function BoardList() {
  const router = useRouter();
  const page = usePaginationStore((state) => state.page);
  const setPage = usePaginationStore((state) => state.setPage);

  const { data: { data, total_pages } = { data: [], total_pages: 1 } } =
    useRepoIssuesQuery({ page, per_page: 10 });

  const handleClickItem = (id: number) => {
    router.push(parsePath(PATH.SERVICE_BOARD_DETAIL, { issueId: id }));
  };

  const handleEdit = (id: number) => {
    router.push(parsePath(PATH.SERVICE_BOARD_EDIT, { issueId: id }));
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  return (
    <>
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
              onClick={() => handleClickItem(issue.number)}
              key={issue.id}
            >
              <td className="text-center">{issue.number}</td>
              <td className="text-center">{issue.title}</td>
              <td className="text-center">{issue.user.login}</td>
              <td className="text-center">
                {issue.created_at.toLocaleString()}
              </td>
              <td className="text-center">
                <DropdownButton
                  preventClickBubbling
                  data={[
                    { title: "수정", onClick: () => handleEdit(issue.number) },
                    {
                      title: "삭제",
                      onClick: () => handleDelete(issue.number),
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

      <ListPagination
        currentPage={page}
        totalPages={total_pages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
