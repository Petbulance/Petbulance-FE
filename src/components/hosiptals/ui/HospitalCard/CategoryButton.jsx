import { ANIMAL_CATEGORY_KO, ANIMAL_NAME_KO } from '@/data/animalSort';

export function CategoryButton({ kind }) {
  const label = ANIMAL_CATEGORY_KO[kind] || ANIMAL_NAME_KO[kind] || kind;

  return (
    <div className="rounded-full bg-[#FAF5B8] px-2 py-1 text-[14px] font-medium text-[#1E1E1E]">
      {label}
    </div>
  );
}
