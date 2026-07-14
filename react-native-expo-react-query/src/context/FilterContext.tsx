import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Filters } from '../types/todo';

interface FilterContextType {
  filters: Filters;
  setSearchText: (text: string) => void;
  setStatusFilter: (status: 'All' | 'Completed' | 'Todo') => void;
  togglePriorityFilter: (priority: 'High' | 'Medium' | 'Low') => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: 'All',
    priorities: [],
  });

  const setSearchText = (text: string) => {
    setFilters((prev) => ({ ...prev, search: text }));
  };

  const setStatusFilter = (status: 'All' | 'Completed' | 'Todo') => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const togglePriorityFilter = (priority: 'High' | 'Medium' | 'Low') => {
    setFilters((prev) => {
      const currentPriorities = prev.priorities;
      const newPriorities = currentPriorities.includes(priority)
        ? currentPriorities.filter((p) => p !== priority)
        : [...currentPriorities, priority];
      return { ...prev, priorities: newPriorities };
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setSearchText,
        setStatusFilter,
        togglePriorityFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
