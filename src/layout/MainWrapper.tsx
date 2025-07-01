export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-4 w-full">{children}</div>;
}
