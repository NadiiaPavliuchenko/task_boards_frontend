import { Board } from "./board.types";
import {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
} from "./operations";
import { createSlice } from "@reduxjs/toolkit";

interface BoardsState {
  items: Board[];
  curBoard: null;
}

const initialState = {
  items: [],
  curBoard: null
} as BoardsState;

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.items = action.payload.data;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.curBoard = action.payload.data;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (board) => board._id === action.payload.data._id
        );
        if (index != -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (board) => board._id === action.payload.data._id
        );
        if (index != -1) {
          state.items.splice(index, 1);
        }
      });
  }
});

export const boardsReducer = boardsSlice.reducer;
