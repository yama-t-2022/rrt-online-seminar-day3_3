import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
//import type { RootState } from '../../app/store'

// Define a type for the slice state

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  //Redux Toolkit の AsyncThunk をさわってみる
  //https://www.cyokodog.net/blog/redux-toolkit-async-thunk/
  extraReducers(builder) {
    builder
      .addCase(incrementAsync.pending, (state) => {
        // pending時に1回呼ばれる  pending: 非同期処理中
        console.log("Called when incrementAsync.pending");
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        // fulfilledに一回呼ばれる  fulfilled: 非同期処理の成功時
        console.log("Called when incrementAsync.fulfilled");
        state.value += action.payload + 2;
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        // rejected時に一回呼ばれる  rejected: 非同期処理の失敗時
        console.log("Called when incrementAsync.rejected");
      });
  },
});

// export const incrementAsync1 = () => () => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(1))
//   }, 1000)
// }

export const incrementAsync = createAsyncThunk(
  `${counterSlice.name}/asyncIncrement`,
  async () => {
    await wait(3000);
    return 1;
  }
);

const wait = (ms = 0) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;

//===========================================================

// export const incrementAsync = createAsyncThunk(
//   `${counterSlice.name}/asyncIncrement`,
//   async () => {
//     await wait(3000);
//     return 1;
//   }
// );

// const wait = (ms = 0) => {
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// };

//===========================================================

// export interface CounterState {
//   value: number;
// }

// // Define the initial state using that type
// //初期値
// const initialState: CounterState = {
//   value: 0,
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,

//   //Reducer
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// //createAsyncThunk
// //https://redux-toolkit.js.org/api/createAsyncThunk

// // First, create the thunk
// const incrementAsync = createAsyncThunk<number>(
//   "counter/incrementAsync",
//   () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(1);
//       }, 1000);
//     });

//     return 1;
//   }
// );

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;
