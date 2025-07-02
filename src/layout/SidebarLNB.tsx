"use client";

import { PATH } from "@/constants/path";
import { usePathname } from "next/navigation";
import { DirtyAwareLink } from "@/app/components/DirtyAwareLink";

export default function SidebarLNB() {
  const pathname = usePathname();

  const isHome = pathname === PATH.HOME;
  const isActive = (path: string) =>
    pathname.startsWith(path) && pathname !== "/";

  return (
    <div className="p-4 w-64 border-r border-gray-200">
      <nav>
        <ul className="flex flex-col gap-2">
          <li className={isHome ? "text-blue-500" : ""}>
            <DirtyAwareLink className="w-full" href={PATH.HOME}>
              홈
            </DirtyAwareLink>
          </li>

          <li className={isActive(PATH.SERVICE_BOARD) ? "text-blue-500" : ""}>
            <DirtyAwareLink className="w-full" href={PATH.SERVICE_BOARD}>
              서비스게시판
            </DirtyAwareLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
