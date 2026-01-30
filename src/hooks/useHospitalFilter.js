import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

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
