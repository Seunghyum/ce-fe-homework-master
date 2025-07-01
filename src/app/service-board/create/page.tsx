"use client";

import { repoIssuesKey, useRepoIssuesMutation } from "@/query/repoIssues";
import PostForm, { FormValues } from "../_containers/PostForm";
import { PATH } from "@/constants/path";
import { useRouter } from "next/navigation";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export default function CreatePage() {
  const router = useRouter();
  const queryClient = new QueryClient();
  const { mutate } = useRepoIssuesMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repoIssuesKey.all });
    },
  });
  const onSubmit = (data: FormValues) => {
    mutate(data);
    router.push(PATH.SERVICE_BOARD);
  };

  return <PostForm onSubmit={onSubmit} />;
}
