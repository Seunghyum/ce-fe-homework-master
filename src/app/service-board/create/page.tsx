"use client";

import { useCreateRepoIssuesMutation } from "@/query/repoIssues";
import PostForm, { FormValues } from "../_containers/PostForm";
import { PATH } from "@/constants/path";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const { mutate } = useCreateRepoIssuesMutation();
  const onSubmit = (data: FormValues) => {
    mutate(data);
    router.push(PATH.SERVICE_BOARD);
  };

  return <PostForm onSubmit={onSubmit} />;
}
