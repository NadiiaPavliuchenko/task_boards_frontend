import { act } from "react";
import { Board } from "./board.types";
import {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  chandeCardStatus,
  chandeCardsOrder,
  deleteBoard
} from "./operations";
import { createSlice } from "@reduxjs/toolkit";
import { createCard } from "../cards/operations";

interface BoardsState {
  items: Board[];
  curBoard: Board | null;
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
      .addCase(chandeCardStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (board) => board._id === action.payload.data._id
        );
        if (index != -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(chandeCardsOrder.fulfilled, (state, action) => {
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
      })
      .addCase(createCard.fulfilled, (state, action) => {
        const { _id } = action.payload.data;
        const boardId = state.curBoard?._id;

        if (state.curBoard && state.curBoard._id === boardId) {
          state.curBoard.todo.push(_id);
        }

        const index = state.items.findIndex((board) => board._id === boardId);
        if (index !== -1) {
          state.items[index].todo.push(_id);
        }
      });
  }
});

export const boardsReducer = boardsSlice.reducer;
