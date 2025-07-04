import { PropsWithChildren } from 'react'

interface SubHeaderProps {
  title: string
}

export default function SubHeader({ title, children }: PropsWithChildren<SubHeaderProps>) {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      {children}
    </div>
  )
}
