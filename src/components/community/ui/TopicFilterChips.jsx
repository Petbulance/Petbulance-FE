import { TOPIC_FILTERS } from '@/data/community';

export function TopicFilterChips({ selectedTopic, onSelectTopic }) {
  return (
    <div className="px-6 py-3">
      <div className="flex gap-2 overflow-x-auto">
        {TOPIC_FILTERS.map((filter) => {
          const isActive = selectedTopic === filter;
          return (
            <button
              key={filter}
              onClick={() => onSelectTopic(filter)}
              className={`shrink-0 rounded-full px-3 py-1 text-[12.94px] ${
                isActive
                  ? 'bg-[#2DA969] text-white'
                  : 'border border-[##EEEEEE] bg-white text-[#424242]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
