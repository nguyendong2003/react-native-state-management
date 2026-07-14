import { create } from 'zustand';

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Filters {
  search: string;
  status: 'All' | 'Completed' | 'Todo';
  priorities: ('High' | 'Medium' | 'Low')[];
}

interface TodoState {
  todos: Todo[];
  filters: Filters;

  // Actions
  addTodo: (todo: Todo) => void;
  toggleTodoStatus: (id: string) => void;
  setSearchText: (text: string) => void;
  setStatusFilter: (status: 'All' | 'Completed' | 'Todo') => void;
  togglePriorityFilter: (priority: 'High' | 'Medium' | 'Low') => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: '1', name: 'Learn Yoga', completed: false, priority: 'Medium' },
    { id: '2', name: 'Learn Redux', completed: true, priority: 'High' },
    { id: '3', name: 'Learn JavaScript', completed: false, priority: 'Low' },
  ],
  filters: {
    search: '',
    status: 'All',
    priorities: [],
  },

  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),

  toggleTodoStatus: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  setSearchText: (text) =>
    set((state) => ({
      filters: { ...state.filters, search: text },
    })),

  setStatusFilter: (status) =>
    set((state) => ({
      filters: { ...state.filters, status },
    })),

  togglePriorityFilter: (priority) =>
    set((state) => {
      const currentPriorities = state.filters.priorities;
      const newPriorities = currentPriorities.includes(priority)
        ? currentPriorities.filter((p) => p !== priority)
        : [...currentPriorities, priority];
      return {
        filters: { ...state.filters, priorities: newPriorities },
      };
    }),
}));
