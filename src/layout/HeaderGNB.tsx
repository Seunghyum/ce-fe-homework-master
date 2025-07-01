export default function HeaderGNB() {
  return (
    <header className="h-16 border-b-2 border-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-2xl">Dashboard</h1>
      <nav>
        <ul className="flex gap-4">
          <li>settings</li>
        </ul>
      </nav>
    </header>
  );
}
