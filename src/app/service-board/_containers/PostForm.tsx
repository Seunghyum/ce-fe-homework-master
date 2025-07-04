'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { DirtyAwareLink } from '@/app/_components/DirtyAwareLink'
import { useDirtyStore } from '@/app/_components/DirtyAwareLink/useDirtyStore'
import { useModal } from '@/app/_context/ModalContext'
import { PATH } from '@/constants/path'

export type FormValues = {
  title: string
  content: string
}

interface PostFormProps extends Partial<FormValues> {
  onSubmit: (data: FormValues) => Promise<void>
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
  })
  const { openModal } = useModal()
  const { setIsDirty } = useDirtyStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)

  const debouncedSubmit = useCallback(
    async (data: FormValues) => {
      if (isSubmittingRef.current) {
        return
      }
      isSubmittingRef.current = true
      setIsSubmitting(true)
      try {
        await onSubmit(data)
      } catch (error) {
        console.error(error)
      } finally {
        setTimeout(() => {
          isSubmittingRef.current = false
          setIsSubmitting(false)
        }, 1000)
      }
    },
    [onSubmit],
  )

  useEffect(() => {
    setIsDirty(isDirty)
  }, [isDirty, setIsDirty])

  useEffect(() => {
    reset({
      title,
      content,
    })
  }, [reset, title, content])

  // 브라우저 새로고침 / 닫기 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty, openModal])

  return (
    <div className="m-auto">
      <form onSubmit={handleSubmit(debouncedSubmit)} noValidate>
        <div className="mb-4">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            className="mt-2 w-full rounded-md border border-gray-300 p-2"
            {...register('title', { required: '제목을 입력해주세요' })}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            {...register('content', { required: '내용을 입력해주세요' })}
            rows={6}
            className="mt-2 w-full rounded-md border border-gray-300 p-2"
          />
          {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`pointer-events-auto cursor-pointer rounded-md border border-gray-300 p-2 ${
              isSubmitting ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {isSubmitting ? '등록 중...' : '글 등록하기'}
          </button>

          <DirtyAwareLink
            className="pointer-events-auto cursor-pointer rounded-md border border-gray-300 p-2"
            href={PATH.SERVICE_BOARD}
          >
            목록
          </DirtyAwareLink>
        </div>
      </form>
    </div>
  )
}
