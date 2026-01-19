export function TabMenu({ activeTab, onChangeTab }) {
  return (
    <div className="flex border-b border-[#EEEEEE]">
      <button
        type="button"
        onClick={() => onChangeTab('region')}
        className={[
          'flex-1 py-3.5 text-center text-[18px] font-semibold',
          activeTab === 'region'
            ? 'border-b-2 border-[#222222] text-[#1E1E1E]'
            : 'text-[#BDBDBD]',
        ].join(' ')}
      >
        지역
      </button>
      <button
        type="button"
        onClick={() => onChangeTab('animal')}
        className={[
          'flex-1 py-3.5 text-center text-[18px] font-semibold',
          activeTab === 'animal'
            ? 'border-b-2 border-[#222222] text-[#1E1E1E]'
            : 'text-[#BDBDBD]',
        ].join(' ')}
      >
        동물종
      </button>
    </div>
  );
}
