export default function MainHeader({ title }) {
  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">
          {title}
        </h1>

      </div>
    </header>
  );
}
