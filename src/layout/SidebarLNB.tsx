"use client";

import { PATH } from "@/constants/path";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLNB() {
  const pathname = usePathname();

  const isHome = pathname === PATH.HOME;
  const isActive = (path: string) =>
    pathname.startsWith(path) && pathname !== "/";

  return (
    <div className="p-4 w-64 border-r border-gray-200">
      <nav>
        <ul className="flex flex-col gap-2">
          <Link href={PATH.HOME}>
            <li className={isHome ? "text-blue-500" : ""}>홈</li>
          </Link>
          <Link href={PATH.SERVICE_BOARD}>
            <li className={isActive(PATH.SERVICE_BOARD) ? "text-blue-500" : ""}>
              서비스게시판
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
