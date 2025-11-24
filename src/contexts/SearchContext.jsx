import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchCache, setSearchCache] = useState({
    results: [],
    searchParams: {},
    totalResults: 0,
    currentPage: 1,
    totalPages: 1
  });

  const updateSearchCache = (newData) => {
    setSearchCache(prev => ({
      ...prev,
      ...newData
    }));
  };

  const clearSearchCache = () => {
    setSearchCache({
      results: [],
      searchParams: {},
      totalResults: 0,
      currentPage: 1,
      totalPages: 1
    });
  };

  return (
    <SearchContext.Provider value={{ searchCache, updateSearchCache, clearSearchCache }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
