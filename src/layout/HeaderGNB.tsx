'use client'

import { DropdownButton } from '@/app/_components/DropdownButton'
import { useViewTypeStore } from '@/app/service-board/_stores/useViewTypeStore'
import { VIEW_TYPE, ViewType } from '@/constants/viewType'

export default function HeaderGNB() {
  const viewType = useViewTypeStore((state) => state.viewType)
  const setViewType = useViewTypeStore((state) => state.setViewType)

  const handleViewTypeChange = (type: ViewType) => {
    setViewType(type)
  }

  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-gray-200 p-4">
      <h1 className="text-2xl">Dashboard</h1>
      <DropdownButton
        data={[
          {
            title: (
              <>
                <input checked={viewType === VIEW_TYPE.LIST} type="radio" className="mr-2" readOnly />
                리스트 보기
              </>
            ),
            onClick: () => handleViewTypeChange(VIEW_TYPE.LIST),
          },
          {
            title: (
              <>
                <input checked={viewType === VIEW_TYPE.CARD} type="radio" className="mr-2" readOnly />
                카드 보기
              </>
            ),
            onClick: () => handleViewTypeChange(VIEW_TYPE.CARD),
          },
        ]}
      >
        설정
      </DropdownButton>
    </header>
  )
}
