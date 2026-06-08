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
      const title = item.snippet?.title?.toLowerCase() || '';
      const description = item.snippet?.description?.toLowerCase() || '';
      const channelTitle = item.snippet?.channelTitle?.toLowerCase() || '';

      const query = searchQuery.toLowerCase();

      const matchesSearch =
        !searchQuery ||
        title.includes(query) ||
        description.includes(query) ||
        channelTitle.includes(query);

      const matchesCategory =
        selectedCategory === 'all' ||
        title.includes(selectedCategory.toLowerCase());

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