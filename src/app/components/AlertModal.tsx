import { useModal } from "./ModalContext";

export default function AlertModal({
  title,
  message,
  onConfirm,
  cancelText = "취소",
  confirmText = "삭제",
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
}) {
  const { closeModal } = useModal();

  return (
    <div className="flex flex-col gap-2 min-w-[300px]">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          className="border border-gray-300 rounded-md p-2 cursor-pointer pointer-events-auto"
          onClick={closeModal}
        >
          {cancelText}
        </button>
        <button
          className="border border-gray-300 rounded-md p-2 cursor-pointer pointer-events-auto"
          onClick={() => {
            onConfirm();
            closeModal();
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
