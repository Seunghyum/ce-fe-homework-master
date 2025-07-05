import { useModal } from './ModalContext'

export default function AlertModal({
  title,
  message,
  onConfirm,
  cancelText = '취소',
  confirmText = '삭제',
}: {
  title: string
  message: string
  onConfirm: () => void
  cancelText?: string
  confirmText?: string
}) {
  const { closeModal } = useModal()

  return (
    <div className="flex min-w-[300px] flex-col gap-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          className="pointer-events-auto cursor-pointer rounded-md border border-gray-300 p-2"
          onClick={closeModal}
        >
          {cancelText}
        </button>
        <button
          className="pointer-events-auto cursor-pointer rounded-md border border-gray-300 p-2"
          onClick={() => {
            onConfirm()
            closeModal()
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  )
}
