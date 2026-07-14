import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

const initialState: Todo[] = [
  { id: '1', name: 'Learn Yoga', completed: false, priority: 'Medium' },
  { id: '2', name: 'Learn Redux', completed: true, priority: 'High' },
  { id: '3', name: 'Learn JavaScript', completed: false, priority: 'Low' },
];

const todosSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    },
  },
});

export const { addTodo, toggleTodoStatus } = todosSlice.actions;
export default todosSlice;
