"use client";

import PostForm, { FormValues } from "./_containers/PostForm";

export default function CreatePage() {
  const onSubmit = (data: FormValues) => {
    console.log("등록된 글:", data);
    // 실제 등록 로직 호출
  };

  return <PostForm onSubmit={onSubmit} />;
}
