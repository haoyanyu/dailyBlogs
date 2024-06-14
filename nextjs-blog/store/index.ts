import { configureStore } from '@reduxjs/toolkit';
import { counterReducers } from './counter';
import { todosReducer } from './todos';

const store = configureStore({
  // 如果是function 会被作为根reducer直接使用，如果是对象，则会自动用combineReducers处理
  reducer: {
    // @ts-ignore
    counter: counterReducers,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
  // enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat([]),
});

export default store;
