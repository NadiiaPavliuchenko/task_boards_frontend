import { configureStore } from "@reduxjs/toolkit";
import { boardsReducer } from "./boards/boardsSlice";
import { cardsReducer } from "./cards/cardsSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    cards: cardsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
