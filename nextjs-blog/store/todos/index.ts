import { createReducer, createAction } from '@reduxjs/toolkit';

export const addTodo = createAction<string>('todos/add');
export const completeTodo = createAction<number>('todos/complete');
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
  .addCase(completeTodo, (state, action) => {
    if (action.payload >= 0) {
      state.todos[action.payload].completed = true;
    }
  })
  .addCase(deleteTodo, (state, action) => {
    if (action.payload >= 0) {
      state.todos.splice(action.payload, 1);
    }
  })
});

export const selectTodos = (state: any) => state.todos;
