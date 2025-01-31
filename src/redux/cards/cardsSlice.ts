import { createSlice } from "@reduxjs/toolkit";
import { Card } from "./card.types";
import {
  createCard,
  deleteCard,
  getCardsByBoard,
  updateCard,
  updateCardStatus
} from "./operations";

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
      .addCase(getCardsByBoard.fulfilled, (state, action) => {
        state.items = action.payload.data;
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
      .addCase(updateCardStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (card) => card._id === action.payload.data._id
        );
        if (index != -1) {
          state.items[index].status = action.payload.data.status;
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
