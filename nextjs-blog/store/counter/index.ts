import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

// 一个计数切片
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    // incrementAsync: (state, action) => {
    //   setTimeout(() => {
      //  此时获取state会报错，proxy已经被撤销，只能执行同步操作
    //     state.value += action.payload
    //   }, 1000)
    // }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const counterReducers = counterSlice.reducer;

// @ts-ignore
export const incrementAsync = (amount: number) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000)
}

// @ts-ignore
export const selectCount = (state) => {
  return state.counter.value;
}