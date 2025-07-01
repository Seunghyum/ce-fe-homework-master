"use client";

import React from "react";
import { useForm } from "react-hook-form";

export type FormValues = {
  title: string;
  content: string;
};

interface PostFormProps {
  onSubmit: (data: FormValues) => void;
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "내용을 입력해주세요" })}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.title ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              marginTop: "0.5rem",
            }}
          />
          {errors.title && (
            <p
              style={{ color: "red", marginTop: "0.25rem", fontSize: "0.9rem" }}
            >
              {errors.title.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            {...register("content", { required: "content을 입력해주세요" })}
            rows={6}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.content ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              marginTop: "0.5rem",
            }}
          />
          {errors.content && (
            <p
              style={{ color: "red", marginTop: "0.25rem", fontSize: "0.9rem" }}
            >
              {errors.content.message}
            </p>
          )}
        </div>

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
      </form>
    </div>
  );
}
