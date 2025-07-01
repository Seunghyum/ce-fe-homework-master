import { PATH } from "@/constants/path";
import Link from "next/link";

export default function ToolBar() {
  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <input className="border border-gray-300 rounded-md p-2" type="text" />
        <button className="border border-gray-300 rounded-md p-2">검색</button>
      </div>
      <div className="flex items-center gap-2">
        <Link href={PATH.SERVICE_BOARD_CREATE}>
          <button className="border border-gray-300 rounded-md p-2 cursor-pointer">
            등록
          </button>
        </Link>
      </div>
    </div>
  );
}
