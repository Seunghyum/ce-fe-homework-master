"use client";

import { PATH } from "@/constants/path";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "@/app/components/ModalContext";
import { useDirtyStore } from "@/app/components/DirtyAwareLink/useDirtyStore";
import { DirtyAwareLink } from "@/app/components/DirtyAwareLink";

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
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      title,
      content,
    },
  });
  const { openModal } = useModal();
  const { setIsDirty } = useDirtyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const debouncedSubmit = useCallback(
    (data: FormValues) => {
      if (isSubmittingRef.current) {
        return;
      }
      isSubmittingRef.current = true;
      setIsSubmitting(true);
      onSubmit(data);

      setTimeout(() => {
        isSubmittingRef.current = false;
        setIsSubmitting(false);
      }, 1000);
    },
    [onSubmit]
  );

  useEffect(() => {
    setIsDirty(isDirty);
  }, [isDirty, setIsDirty]);

  useEffect(() => {
    reset({
      title,
      content,
    });
  }, [reset, title, content]);

  // 브라우저 새로고침 / 닫기 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, openModal]);

  return (
    <div className="m-auto">
      <form onSubmit={handleSubmit(debouncedSubmit)} noValidate>
        <div className="mb-4">
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

        <div className="mb-4">
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
            disabled={isSubmitting}
            className={`border border-gray-300 rounded-md p-2 cursor-pointer pointer-events-auto ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "등록 중..." : "글 등록하기"}
          </button>

          <DirtyAwareLink
            className="border border-gray-300 rounded-md p-2 cursor-pointer pointer-events-auto"
            href={PATH.SERVICE_BOARD}
          >
            목록
          </DirtyAwareLink>
        </div>
      </form>
    </div>
  );
}
