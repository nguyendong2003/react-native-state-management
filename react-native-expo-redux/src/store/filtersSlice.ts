import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  search: string;
  status: 'All' | 'Completed' | 'Todo';
  priorities: ('High' | 'Medium' | 'Low')[];
}

const initialState: FiltersState = {
  search: '',
  status: 'All',
  priorities: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    searchFilterChange: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    statusFilterChange: (state, action: PayloadAction<'All' | 'Completed' | 'Todo'>) => {
      state.status = action.payload;
    },
    prioritiesFilterChange: (state, action: PayloadAction<('High' | 'Medium' | 'Low')[]>) => {
      state.priorities = action.payload;
    },
  },
});

export const { searchFilterChange, statusFilterChange, prioritiesFilterChange } = filtersSlice.actions;
export default filtersSlice;
