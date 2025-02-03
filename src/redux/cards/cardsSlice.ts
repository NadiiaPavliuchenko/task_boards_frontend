import { createSlice } from "@reduxjs/toolkit";
import { Card } from "./card.types";
import { createCard, deleteCard, getCardsById, updateCard } from "./operations";

interface CardsState {
  items: Card[];
}

const initialState = {
  items: []
} as CardsState;

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCardsById.fulfilled, (state, action) => {
        action.payload.forEach((item) => {
          const index = state.items.findIndex(
            (card) => card._id === item.data._id
          );
          if (index === -1) state.items.push(item.data);
        });
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (card) => card._id === action.payload.data._id
        );
        if (index != -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (card) => card._id === action.payload.data._id
        );
        if (index != -1) {
          state.items.splice(index, 1);
        }
      });
  }
});

export const cardsReducer = cardsSlice.reducer;
