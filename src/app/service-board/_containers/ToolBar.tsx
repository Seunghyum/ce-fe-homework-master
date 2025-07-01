export default function ToolBar() {
  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <input className="border border-gray-300 rounded-md p-2" type="text" />
        <button className="border border-gray-300 rounded-md p-2">검색</button>
      </div>
      <div className="flex items-center gap-2">
        <button className="border border-gray-300 rounded-md p-2">등록</button>
      </div>
    </div>
  );
}
