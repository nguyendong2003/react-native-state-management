import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const searchTextSelector = (state: RootState) => state.filters.search;
export const filterStatusSelector = (state: RootState) => state.filters.status;
export const filterPrioritiesSelector = (state: RootState) => state.filters.priorities;
export const todoListSelector = (state: RootState) => state.todoList;

export const todosRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  searchTextSelector,
  filterPrioritiesSelector,
  (todoList, status, searchText, priorities) => {
    const searchLower = searchText.toLowerCase();
    
    return todoList.filter((todo) => {
      const nameMatches = todo.name.toLowerCase().includes(searchLower);

      if (status === 'All') {
        return priorities.length
          ? nameMatches && priorities.includes(todo.priority)
          : nameMatches;
      }

      const statusMatches = status === 'Completed' ? todo.completed : !todo.completed;
      const priorityMatches = priorities.length ? priorities.includes(todo.priority) : true;

      return nameMatches && statusMatches && priorityMatches;
    });
  }
);
