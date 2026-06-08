import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

export const useSearch = (items) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useSearch must be used within AppProvider');
  }

  const { searchQuery, selectedCategory } = context.state;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.channelTitle?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        item.category === selectedCategory ||
        !item.category;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  return {
    filteredItems,
    searchQuery,
    selectedCategory,
    setSearchQuery: context.setSearchQuery,
    setCategory: context.setCategory,
  };
};
