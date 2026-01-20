export function DetailTabMenu({ activeTab, onChangeTab }) {
  return (
    <div className="flex border-b border-[#EEEEEE] bg-white">
      <button
        type="button"
        onClick={() => onChangeTab('detail')}
        className={[
          'flex-1 py-3.5 text-center text-[18px] font-semibold',
          activeTab === 'detail'
            ? 'border-b-2 border-[#222222] text-[#1E1E1E]'
            : 'text-[#BDBDBD]',
        ].join(' ')}
      >
        상세정보
      </button>
      <button
        type="button"
        onClick={() => onChangeTab('review')}
        className={[
          'flex-1 py-3.5 text-center text-[18px] font-semibold',
          activeTab === 'review'
            ? 'border-b-2 border-[#222222] text-[#1E1E1E]'
            : 'text-[#BDBDBD]',
        ].join(' ')}
      >
        방문 후기
      </button>
    </div>
  );
}
