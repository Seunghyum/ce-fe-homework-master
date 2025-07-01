"use client";

import { PATH } from "@/constants/path";
import { useRepoIssueByIdQuery } from "@/query/repoIssues";
import Link from "next/link";
import { MoreMenu } from "../../_containers/MoreMenu";
import { parsePath } from "@/utils/path";
import { useRouter } from "next/navigation";

export default function PostDetail({ issueId }: { issueId: string }) {
  const router = useRouter();
  const { data } = useRepoIssueByIdQuery(issueId);

  const handleEdit = () => {
    router.push(parsePath(PATH.SERVICE_BOARD_EDIT, { issueId }));
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div className="border-2 border-gray-200 rounded-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-2">{data?.title}</h1>
        <MoreMenu onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <p className="text-sm text-gray-500">
        {data?.user.login} | {data?.created_at.toLocaleString()}
      </p>
      <hr className="my-4" />

      <p className="whitespace-pre-wrap  min-h-[50vh]">{data?.body}</p>
      <hr className="my-4" />
      <div className="flex justify-end">
        <Link href={PATH.SERVICE_BOARD}>
          <button className="border border-gray-300 rounded-md p-2 cursor-pointer">
            목록
          </button>
        </Link>
      </div>
    </div>
  );
}
