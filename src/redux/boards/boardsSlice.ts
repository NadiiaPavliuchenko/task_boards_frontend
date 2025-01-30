// import { Board } from "./board.types";
// import { getAllBoards } from "./operations";
// import { createSlice } from "@reduxjs/toolkit";

// interface BoardsState {
//   items: Board[];
// }

// const initialState = {
//   items: []
// } satisfies BoardState as BoardsState;

// const boardsSlice = createSlice({
//   name: "boards",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getAllBoards.fulfilled, (state, action) => {
//       state.items.push(action.payload);
//     });
//   }
// });
