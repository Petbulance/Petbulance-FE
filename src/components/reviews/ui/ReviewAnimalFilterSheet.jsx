import { useState } from 'react';

import { GreenBtn } from '@/components/commons/button/greenBtn';

import { ModalCategoryHeader } from './ModalCategoryHeader';
import { ModalTag } from './ModalTag';
import { ResetHeader } from './ResetHeader';

export function ReviewAnimalFilterSheet() {
  const ANIMAL_DATA = [
    {
      category: '소형 포유류',
      tags: [
        '햄스터',
        '토끼',
        '기니피그',
        '슈가글라이더',
        '고슴도치',
        '친칠라',
        '페럿',
        '프레리도그',
        '하늘다람쥐',
        '기타 소동물',
      ],
    },
    {
      category: '조류',
      tags: ['앵무새', '핀치류', '기타 조류'],
    },
    {
      category: '파충류',
      tags: ['게코', '기타 도마뱀', '거북이', '기타 파충류'],
    },
    {
      category: '양서류',
      tags: ['개구리', '우파루파', '도룡뇽', '기타 양서류'],
    },
    {
      category: '어류',
      tags: ['관상어', '기타 어류'],
    },
  ];

  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  //카테고리 전체 선택/해제 핸들러
  const toggleCategory = (categoryTags) => {
    const allSelected = categoryTags.every((tag) => selectedTags.includes(tag));

    if (allSelected) {
      setSelectedTags(
        selectedTags.filter((tag) => !categoryTags.includes(tag))
      );
    } else {
      const newTags = [...new Set([...selectedTags, ...categoryTags])];
      setSelectedTags(newTags);
    }
  };

  const resetSelection = () => setSelectedTags([]);

  return (
    <div className="flex h-dvh flex-col bg-white pb-50">
      <ResetHeader onClick={resetSelection} />
      <div className="min-h-0 flex-1 overflow-y-auto px-8">
        {ANIMAL_DATA.map((section) => {
          const isAllSelected = section.tags.every((tag) =>
            selectedTags.includes(tag)
          );

          return (
            <div key={section.category} className="mt-11 first:mt-6">
              <ModalCategoryHeader
                section={section}
                isAllSelected={isAllSelected}
                onToggleAll={() => toggleCategory(section.tags)}
              />

              <ModalTag
                section={section}
                selectedTags={selectedTags}
                toggleTag={toggleTag}
              />
            </div>
          );
        })}
      </div>
      <GreenBtn name="후기 보기" />
    </div>
  );
}
