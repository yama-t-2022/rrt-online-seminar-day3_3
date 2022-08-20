//import React from "react";
import type { FC } from "react";

//import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

//import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./counterSlice";

//export function Counter() {

export const Counter: FC = () => {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const count2 = useSelector(selectCount);
  const count = useAppSelector((state) => state.counter.value);
  const count2 = useAppSelector(selectCount);

  //const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <span>{count2}</span>

        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <span>{count}</span>

        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

        <button
          aria-label="Decrement value"
          onClick={() => dispatch(incrementByAmount(10))}
        >
          Increment 10
        </button>

        <button
          // TODO 型 'AsyncThunkAction<number, void, {}>' の引数を型 'AnyAction' のパラメーターに割り当てることはできません
          // NOTE useDispatch ⇒ useAppDispatch にする必要あり
          aria-label="Increment async value"
          onClick={() => dispatch(incrementAsync())}
        >
          Increment async
        </button>

        {/* 1:30付近  非同期 Wait */}
      </div>
    </div>
  );
};
