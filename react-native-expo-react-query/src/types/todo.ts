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
