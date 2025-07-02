import SubHeader from '@/layout/SubHeader'

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <SubHeader title="게시글 등록">{children}</SubHeader>
}
