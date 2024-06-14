import { createReducer, createAction } from '@reduxjs/toolkit';

export const addTodo = createAction<string>('todos/add');
export const toggleTodo = createAction<number>('todos/complete');
export const deleteTodo = createAction<number>('todos/delete');

export const todosReducer = createReducer({
  todos: [
    { text: 'Eat Food', completed: false },
    { text: 'Exercise', completed: false },
  ],
  status: 'ALL',
}, (builder) => {
  builder.addCase(addTodo, (state, action) => {
    state.todos.push({
      text: action.payload,
      completed: false,
    })
  })
  .addCase(toggleTodo, (state, action) => {
    const idx = action.payload;
    if (idx >= 0) {
      const originalStatus = state.todos[action.payload].completed
      state.todos[action.payload].completed = !originalStatus;
    }
  })
  .addCase(deleteTodo, (state, action) => {
    if (action.payload >= 0) {
      state.todos.splice(action.payload, 1);
    }
  })
});

export const selectTodos = (state: any) => state.todos;
