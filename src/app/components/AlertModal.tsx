import { useModal } from "./ModalContext";

export default function AlertModal({
  title,
  message,
  onConfirm,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
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
          취소
        </button>
        <button
          className="border border-gray-300 rounded-md p-2 cursor-pointer pointer-events-auto"
          onClick={() => {
            onConfirm();
            closeModal();
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
