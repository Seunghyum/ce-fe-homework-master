import { PropsWithChildren } from 'react'

interface SubHeaderProps {
  title: string
}

export default function SubHeader({ title, children }: PropsWithChildren<SubHeaderProps>) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {children}
    </div>
  )
}
