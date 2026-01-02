export default  function NotificationTabs({ active, onChange }) {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      {['공지사항', '내 활동'].map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-3 text-[18px] font-medium ${
            active === tab
              ? 'border-b-2 border-gray-900 text-gray-900'
              : 'text-gray-400'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}