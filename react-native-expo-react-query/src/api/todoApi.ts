import { Todo } from '../types/todo';

// Initial mock database of todos (in-memory)
let mockTodos: Todo[] = [
  { id: '1', name: 'Learn Yoga', completed: false, priority: 'Medium' },
  { id: '2', name: 'Learn Redux', completed: true, priority: 'High' },
  { id: '3', name: 'Learn JavaScript', completed: false, priority: 'Low' },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = async (): Promise<Todo[]> => {
  await delay(600); // Simulate network latency
  return [...mockTodos];
};

export const addTodo = async (todo: Omit<Todo, 'id' | 'completed'>): Promise<Todo> => {
  await delay(500); // Simulate server write time
  const newTodo: Todo = {
    ...todo,
    id: Date.now().toString(),
    completed: false,
  };
  mockTodos = [...mockTodos, newTodo];
  return newTodo;
};

export const toggleTodoStatus = async (id: string): Promise<Todo> => {
  await delay(300); // Simulate toggle database delay
  let updatedTodo: Todo | null = null;
  
  mockTodos = mockTodos.map((todo) => {
    if (todo.id === id) {
      updatedTodo = { ...todo, completed: !todo.completed };
      return updatedTodo;
    }
    return todo;
  });

  if (!updatedTodo) {
    throw new Error(`Todo with ID ${id} not found.`);
  }

  return updatedTodo;
};
