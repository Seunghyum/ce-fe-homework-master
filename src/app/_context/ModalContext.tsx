'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import ReactDOM from 'react-dom'

type ModalContent = ReactNode

interface ModalContextType {
  modals: ModalContent[]
  openModal: (content: ModalContent) => void
  closeModal: () => void
  closeAll: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalContent[]>([])

  const openModal = (content: ModalContent) => {
    setModals((prev) => [...prev, content])
  }

  const closeModal = () => {
    if (modals.length > 1) {
      setModals((prev) => prev.slice(0, -1))
    } else {
      setModals([])
    }
  }

  const closeAll = () => {
    setModals([])
  }

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, closeAll }}>
      {children}
      <ModalStack modals={modals} closeModal={closeModal} />
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal 은 ModalProvider 안에서만 사용할 수 있습니다.')
  return context
}

const ModalStack = ({ modals, closeModal }: { modals: ModalContent[]; closeModal: () => void }) => {
  if (typeof window === 'undefined') return null

  return ReactDOM.createPortal(
    <>
      {modals.length > 0 && <div onClick={closeModal} className="fixed inset-0 z-[1000] bg-black/50" />}
      {modals.map((Modal, idx) => (
        <div
          key={idx}
          className="pointer-events-none fixed inset-0 z-[1010] flex items-center justify-center overflow-auto"
        >
          <div className="max-h-[90vh] overflow-y-auto rounded-md bg-white p-4 shadow-md">{Modal}</div>
        </div>
      ))}
    </>,
    document.body,
  )
}
