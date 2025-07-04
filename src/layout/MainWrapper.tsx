export default function MainWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex-1 overflow-y-auto p-4">{children}</div>
}
