'use client'

import { useRouter } from 'next/navigation'

import AlertModal from '@/app/_components/AlertModal'
import { useModal } from '@/app/_components/ModalContext'

import { useDirtyStore } from './useDirtyStore'

export function DirtyAwareLink({
  className,
  href,
  children,
}: {
  className?: string
  href: string
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isDirty, setIsDirty } = useDirtyStore()
  const { openModal } = useModal()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isDirty) {
      openModal(
        <AlertModal
          title="안내"
          message="작성 중인 내용이 사라집니다. 페이지를 이동하시겠습니까?"
          onConfirm={() => {
            setIsDirty(false)
            router.push(href)
          }}
          confirmText="이동"
        />,
      )
    } else {
      router.push(href)
    }
  }

  return (
    <button className={`cursor-pointer ${className}`} onClick={handleClick}>
      {children}
    </button>
  )
}
