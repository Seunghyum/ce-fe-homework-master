"use client";

import { PATH } from "@/constants/path";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export type FormValues = {
  title: string;
  content: string;
};

interface PostFormProps extends Partial<FormValues> {
  onSubmit: (data: FormValues) => void;
}

export default function PostForm({ title, content, onSubmit }: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title,
      content,
    },
  });

  useEffect(() => {
    reset({
      title,
      content,
    });
  }, [reset, title, content]);

  return (
    <div style={{ margin: "2rem auto" }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            {...register("title", { required: "제목을 입력해주세요" })}
          />
          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            {...register("content", { required: "내용을 입력해주세요" })}
            rows={6}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          {errors.content && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            글 등록하기
          </button>

          <Link href={PATH.SERVICE_BOARD}>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                border: "1px solid #000",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              목록
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
