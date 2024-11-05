import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const { text, targetDate, priority } = action.payload;
      state.push({
        id: Date.now(),
        text,
        completed: false,
        createdDate: new Date().toISOString(),
        targetDate,
        priority,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, newText, newTargetDate, newPriority } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
        todo.targetDate = newTargetDate;
        todo.priority = newPriority;
      }
    },
    sortTodos: (state, action) => {
      const { sortBy, sortOrder } = action.payload;

      if (sortBy === 'date') {
        return state.slice().sort((a, b) => {
          const dateComparison = new Date(a.targetDate) - new Date(b.targetDate);
          return sortOrder === 'ascending' ? dateComparison : -dateComparison;
        });
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3, none: 4 };
        return state.slice().sort((a, b) => {
          const priorityComparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          return sortOrder === 'ascending' ? priorityComparison : -priorityComparison;
        });
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, sortTodos } = todoSlice.actions;
export default todoSlice.reducer;