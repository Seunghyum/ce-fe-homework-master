"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalContent = ReactNode;

interface ModalContextType {
  modals: ModalContent[];
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
  closeAll: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalContent[]>([]);

  const openModal = (content: ModalContent) => {
    setModals((prev) => [...prev, content]);
  };

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1));
  };

  const closeAll = () => {
    setModals([]);
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, closeAll }}>
      {children}
      <ModalStack modals={modals} closeModal={closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal 은 ModalProvider 안에서만 사용할 수 있습니다.");
  return context;
};

import ReactDOM from "react-dom";

const ModalStack = ({
  modals,
  closeModal,
}: {
  modals: ModalContent[];
  closeModal: () => void;
}) => {
  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <>
      {modals.length > 0 && (
        <div
          // className="modal-backdrop"
          onClick={closeModal}
          className="fixed inset-0 bg-black/50 z-[1000]"
          // style={{
          //   position: "fixed",
          //   inset: 0,
          //   background: "rgba(0,0,0,0.5)",
          //   zIndex: 1000,
          // }}
        />
      )}
      {modals.map((Modal, idx) => (
        <div
          key={idx}
          // className="modal-container"
          className="fixed inset-0 z-[1001] flex justify-center items-center overflow-auto"
          // style={{
          //   position: "fixed",
          //   inset: 0,
          //   zIndex: 1001 + idx,
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   overflow: "auto",
          // }}
        >
          <div
            className="bg-white p-4 rounded-md max-h-[90vh] overflow-y-auto shadow-md"
            // style={{
            //   background: "white",
            //   padding: "1rem",
            //   borderRadius: "8px",
            //   maxHeight: "90vh",
            //   overflowY: "auto",
            //   boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            // }}
          >
            {Modal}
          </div>
        </div>
      ))}
    </>,
    document.body
  );
};
