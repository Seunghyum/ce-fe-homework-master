import Link from "next/link";

export default function SidebarLNB() {
  return (
    <div className="p-4 w-64">
      <nav>
        <ul className="flex flex-col gap-2">
          <Link href="/">
            <li>홈</li>
          </Link>
          <Link href="/service-board">
            <li>서비스게시판</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
