"use client";

import { useRepoIssuesQuery } from "@/query/repoIssues";
import { useState } from "react";

export default function BoardList() {
  const [page, setPage] = useState(1);
  const { data } = useRepoIssuesQuery({ page, per_page: 10 });
  return (
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
        {data?.map((issue) => (
          <tr className="border-b border-l border-gray-200" key={issue.id}>
            <td className="text-center">{issue.number}</td>
            <td className="text-center">{issue.title}</td>
            <td className="text-center">{issue.user.login}</td>
            <td className="text-center">{issue.created_at.toLocaleString()}</td>
            <td className="text-center">
              <button>...</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
