import { Chip } from './Chip';

export function SearchSection({ title, emptyText, items = [], onRemove }) {
  const hasItems = items.length > 0;

  return (
    <section>
      <h2 className="text-[22px] font-semibold text-[#1E1E1E]">{title}</h2>

      {!hasItems ? (
        <p className="mt-3 text-[18px] font-medium text-[#9E9E9E]">
          {emptyText}
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((item) => (
            <Chip
              key={item}
              label={item}
              onRemove={onRemove ? () => onRemove(item) : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
