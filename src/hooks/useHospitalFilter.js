import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { ANIMAL_CATEGORY_KO } from '@/data/animalSort';
import { pushDataLayer } from '@/lib/gtm';

export function useHospitalFilter() {
  const context = useOutletContext();

  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSortChange = (value) => {
    context.setFilterState((prev) => ({ ...prev, sort: value }));
    setIsSortOpen(false);
  };

  const handleToggleOpen = () => {
    context.setFilterState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleApplyFilter = (newData) => {
    if (newData?.animal) {
      const selected = Array.isArray(newData.animal) ? newData.animal[0] : '';
      pushDataLayer('apply_search_filter', {
        filter_type: '동물종',
        filter_value: selected ? ANIMAL_CATEGORY_KO[selected] || selected : '',
        from_screen: '병원검색',
      });
    }

    if (Object.prototype.hasOwnProperty.call(newData, 'city')) {
      const nextRegion = Array.isArray(newData.region)
        ? newData.region.join(', ')
        : '';
      pushDataLayer('apply_search_filter', {
        filter_type: '지역',
        filter_value: nextRegion || newData.city || '',
        from_screen: '병원검색',
      });
    }

    context.setFilterState((prev) => ({ ...prev, ...newData }));
    closeSheet();
  };

  const closeSheet = () => context.setActiveSheet(null);

  return {
    ...context,
    isSortOpen,
    setIsSortOpen,
    handleSortChange,
    handleToggleOpen,
    handleApplyFilter,
    closeSheet,
  };
}
