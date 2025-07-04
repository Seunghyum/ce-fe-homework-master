'use client'

import Image from 'next/image'

import { useMemo } from 'react'

import { useViewTypeStore } from '@/app/service-board/_stores/useViewTypeStore'
import { VIEW_TYPE } from '@/constants/viewType'

import { useIsMounted } from '../hooks/useIsMounted'

const IMAGES = ['img_homework_1.png', 'img_homework_2.png', 'img_homework_3.png', 'img_homework_4.png']

export default function Home() {
  const viewType = useViewTypeStore((state) => state.viewType)
  const isMounted = useIsMounted()
  const images = useMemo(() => {
    if (viewType === VIEW_TYPE.CARD) {
      return [...IMAGES].reverse()
    }
    return IMAGES
  }, [viewType])

  return (
    isMounted && (
      <div className="grid w-full grid-cols-2 gap-4">
        {images.map((img) => (
          <Image key={img} src={`/images/${img}`} alt="image" width={1000} height={420} />
        ))}
      </div>
    )
  )
}
