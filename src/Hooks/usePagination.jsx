import { useContext, useMemo } from 'react';
import { AppContext } from '../Context/AppContext';

export const usePagination = (items) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('usePagination must be used within AppProvider');
  }

  const { currentPage, itemsPerPage } = context.state;

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    return {
      currentItems,
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems: items.length,
    };
  }, [items, currentPage, itemsPerPage]);

  return {
    ...paginationData,
    setPage: context.setPage,
    goToNextPage: () => {
      if (paginationData.currentPage < paginationData.totalPages) {
        context.setPage(paginationData.currentPage + 1);
      }
    },
    goToPreviousPage: () => {
      if (paginationData.currentPage > 1) {
        context.setPage(paginationData.currentPage - 1);
      }
    },
  };
};
