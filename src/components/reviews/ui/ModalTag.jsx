export function ModalTag({ section, selectedTags, toggleTag }) {
  return (
    <div className="flex flex-wrap gap-2">
      {section.tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`rounded-full border bg-white px-4 py-2 text-[16px] leading-5 transition-colors ${
              isSelected
                ? 'border-[#222222] font-medium text-[#1E1E1E]'
                : 'border-[#9E9E9E] text-[#BDBDBD] hover:bg-gray-50'
            } `}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
